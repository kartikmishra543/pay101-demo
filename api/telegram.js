import { createHmac, timingSafeEqual } from 'node:crypto';
import answerQuestion from './chat.js';

const site = 'https://www.pay101.io';
const currentPaths = {
  '/gaming': '/industries/gaming',
  '/media-entertainment': '/industries/media-entertainment',
  '/digital-services': '/industries/digital-businesses',
  '/#contact': '/contact',
  '/#solutions': '/solutions',
  '/#industries': '/industries',
  '/#security': '/security',
};

function isTelegramRequest(header, secret) {
  if (typeof header !== 'string') return false;
  const supplied = Buffer.from(header);
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

async function buildReply(message) {
  if (/^\/(start|help)(?:@Pay101TelBot)?(?:\s|$)/i.test(message)) {
    return 'Hi! Ask me about Pay101 payins, payouts, settlements, markets, pricing, integration, or onboarding. Type /human to reach the support team. For account-specific help, visit ' + site + '/contact.';
  }
  if (message.length > 500) return 'Please ask your question in 500 characters or fewer.';
  if (/\b(?:\d[ -]?){12,19}\b/.test(message) || /\b(?:account|transaction|payment|payout|settlement)\s+(?:id|number|reference|status)\b/i.test(message)) {
    return 'For help with an account or a specific payment, contact Pay101 at ' + site + '/contact. Please keep payment details out of this chat.';
  }

  let result;
  await answerQuestion({ method: 'POST', body: { message } }, {
    setHeader() {},
    json(value) { result = value; },
  });
  const links = (result?.sources ?? []).slice(0, 2).map(({ url }) => site + (currentPaths[url] ?? url));
  return [result?.answer ?? 'Please contact Pay101 at ' + site + '/contact.', ...links].join('\n\n');
}

function replyRoute(chatId, secret) {
  return createHmac('sha256', secret).update('support:' + chatId).digest('hex');
}

async function sendMessage(token, chatId, text) {
  try {
    const result = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, link_preview_options: { is_disabled: true } }),
      signal: AbortSignal.timeout(5000),
    });
    return result.ok && (await result.json()).ok === true;
  } catch {
    return false;
  }
}

function respond(res, chatId, text) {
  return res.status(200).json({
    method: 'sendMessage',
    chat_id: chatId,
    text,
    link_preview_options: { is_disabled: true },
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) return res.status(503).end();
  if (!isTelegramRequest(req.headers['x-telegram-bot-api-secret-token'], secret)) {
    return res.status(401).end();
  }

  const message = req.body?.message;
  const question = typeof message?.text === 'string' ? message.text.trim() : '';
  const chat = message?.chat;
  if (!Number.isSafeInteger(chat?.id) || !question || message.from?.is_bot) {
    return res.status(204).end();
  }

  const group = process.env.TELEGRAM_SUPPORT_CHAT_ID;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const enabled = /^-\d+$/.test(group ?? '') && Boolean(token);
  if (chat.type !== 'private') {
    if (!enabled || String(chat.id) !== group || !['group', 'supergroup'].includes(chat.type)) {
      return res.status(204).end();
    }
    const original = message.reply_to_message;
    const route = /^Pay101 support (\d+) ([a-f0-9]{64})\n/.exec(original?.text ?? '');
    if (original?.from?.username?.toLowerCase() !== 'pay101telbot' ||
        !route || !isTelegramRequest(route[2], replyRoute(route[1], secret))) {
      return res.status(204).end();
    }
    const sent = await sendMessage(token, route[1], 'Pay101 Support: ' + question.slice(0, 4000));
    return respond(res, chat.id, sent ? 'Reply delivered.' : 'Could not deliver the reply.');
  }

  const handoff = /^(?:\/human(?:@Pay101TelBot)?|\/start human)(?:\s+([\s\S]+))?$/i.exec(question);
  if (handoff) {
    if (!enabled) return respond(res, chat.id, 'Contact the Pay101 team at ' + site + '/contact.');
    const note = handoff[1]?.trim();
    if (!note || note.length > 1000) {
      return respond(res, chat.id, 'To send a message to the Pay101 support team, type /human followed by your question (up to 1,000 characters). Leave out passwords and payment details.');
    }
    const sent = await sendMessage(token, group,
      'Pay101 support ' + chat.id + ' ' + replyRoute(chat.id, secret) +
      '\n\n' + note + '\n\nReply to this message to contact the customer.');
    return respond(res, chat.id, sent
      ? 'Your message was sent to the Pay101 support team. Their reply will appear here.'
      : 'Your message could not be sent. Please use ' + site + '/contact.');
  }
  return respond(res, chat.id, await buildReply(question));
}
