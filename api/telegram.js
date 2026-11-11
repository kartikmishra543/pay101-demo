import { timingSafeEqual } from 'node:crypto';
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
    return 'Hi! Ask me about Pay101 payins, payouts, settlements, markets, pricing, integration, or onboarding. For account-specific help, visit ' + site + '/contact.';
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
  if (message?.chat?.type !== 'private' || !Number.isSafeInteger(message.chat.id) || !question) {
    return res.status(204).end();
  }

  // Telegram executes this Bot API method as the webhook response.
  const reply = await buildReply(question);
  return res.status(200).json({
    method: 'sendMessage',
    chat_id: message.chat.id,
    text: reply,
    link_preview_options: { is_disabled: true },
  });
}
