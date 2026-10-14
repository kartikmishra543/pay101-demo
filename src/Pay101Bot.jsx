import React from 'react';
import { MessageCircle, X, Send, Bot, ExternalLink, Trash2 } from 'lucide-react';
import './pay101bot.css';

// Verified website-demo information only. Update this knowledge base as Pay101 publishes details.
const faq=[
 {q:'What is Pay101?',tags:'about company platform overview',a:'Pay101 is presented here as a payment platform concept bringing payins, payouts, settlement workflows and payment visibility together. This is a demo website, not a confirmation that every feature is live.',link:'#about'},
 {q:'What payment solutions do you offer?',tags:'solutions services payments collections',a:'The website showcases payin solutions, payout solutions, instant settlement workflows, UPI payments, IMPS transfers, and NEFT/RTGS workflows. Actual service availability and onboarding must be confirmed with the team.',link:'#solutions'},
 {q:'Which countries and markets are shown?',tags:'markets countries regions india nepal bhutan brazil australia global international',a:'The demo highlights India, Nepal, Bhutan, Brazil and Australia, plus an option to enquire about more markets. Market coverage is illustrative and not a claim of live availability.',link:'#markets'},
 {q:'Which payment methods are displayed?',tags:'upi npci paytm phonepe gpay google pay esewa bkash pix apple pay cards payid bank transfer payment methods',a:'The website illustrates UPI, NPCI, Paytm, PhonePe, GPay, eSewa, bKash, Pix, Apple Pay, Google Pay and other regional methods. These are examples; displayed branding does not confirm a direct integration or partnership.',link:'#rails'},
 {q:'What are payins?',tags:'payin payins collect receive customer payment deposits',a:'Payins refer to receiving payments from customers into a business payment flow. The Pay101 demo describes digital collection workflows; supported channels and settlement terms need confirmation.',link:'#solutions'},
 {q:'What are payouts?',tags:'payout payouts send disburse vendor supplier transfer',a:'Payouts are payments sent by a business to vendors, partners or customers. The demo illustrates a unified payout workflow; live capabilities and eligibility should be checked with Pay101.',link:'#solutions'},
 {q:'How fast are settlements?',tags:'instant settlements speed settlement time t plus one t+1',a:'The site showcases instant settlement workflows as a solution concept, but does not publish verified settlement times, SLAs or eligibility. Please contact the team for exact terms.',link:'#contact'},
 {q:'Does Pay101 support UPI, IMPS, NEFT and RTGS?',tags:'upi imps neft rtgs indian bank transfers',a:'These Indian payment and transfer methods appear in the demo solutions. Their live availability, limits and integrations are not confirmed on this website.',link:'#solutions'},
 {q:'Can I view the payment dashboard?',tags:'dashboard reporting overview transactions multi currency currencies monitoring',a:'Yes. The homepage includes a sample multi-currency payment dashboard with illustrative transaction activity, success rate and payment charts. Its figures are demo data.',link:'#about'},
 {q:'Is the merchant portal available?',tags:'login sign in merchant portal account credentials password',a:'There is a merchant sign-in preview at /login. The demo does not establish that a production merchant account is available. For access questions, contact support@pay101.uk.',link:'/login'},
 {q:'How do I integrate Pay101?',tags:'api developer integration sdk docs webhook documentation technical',a:'The website includes a How it works section, but verified production API documentation, credentials and integration requirements are not provided here. Please contact the team for developer onboarding.',link:'#developers'},
 {q:'What are the fees or transaction charges?',tags:'pricing cost fees charges rate commission setup',a:'The website does not publish verified transaction fees or pricing. Contact support@pay101.uk for a quotation and supported payment methods.',link:'#contact'},
 {q:'How do I get started?',tags:'onboarding signup register start business merchant apply',a:'Use the Get started button or Contact section to enquire about onboarding. Live merchant eligibility and approval steps must be confirmed by the Pay101 team.',link:'#contact'},
 {q:'How secure is Pay101?',tags:'security privacy compliance fraud encryption pci kyc data protection',a:'The website has a Security section describing the concept. It does not provide independently verified compliance certifications or detailed production security controls. Ask the team for official documentation.',link:'#security'},
 {q:'How can I contact Pay101?',tags:'contact email help support phone address sales customer service',a:'For business enquiries and support, email support@pay101.uk. No verified phone number or physical address is published in this demo.',link:'#contact'},
 {q:'Is Pay101 available in my country?',tags:'available supported live country geography location international',a:'The countries on the site are illustrative. Please contact support@pay101.uk with your country and preferred payment method to confirm availability.',link:'#markets'}
];
const stop=new Set(['the','a','an','is','are','does','do','can','i','you','we','it','of','for','in','on','to','with','my','your','what','how','where','which','and','about','please','tell','me','pay101']);
function tokens(s){return [...new Set(s.toLowerCase().replace(/[^a-z0-9+]+/g,' ').split(/\s+/).filter(w=>w.length>1&&!stop.has(w)))];}
function answer(question){
 const query=question.toLowerCase().trim();
 if(!query)return null;
 if(/^(hi|hello|hey|good morning|good evening|namaste)[!. ]*$/.test(query))return {a:'Hello! I am Pay101Bot. Ask me about Pay101 solutions, markets, payment methods, the dashboard or how to contact the team.'};
 const words=tokens(query);
 if(!words.length)return {a:'I can help with Pay101 website information. Try asking about payment solutions, supported markets, pricing or onboarding.'};
 let best=null,score=0;
 for(const item of faq){const title=tokens(item.q), tags=tokens(item.tags);let n=0;for(const w of words){if(title.includes(w))n+=4;else if(tags.includes(w))n+=2;else if(tags.some(t=>t.startsWith(w)&&w.length>=4))n+=1;}if(n>score){score=n;best=item;}}
 return score>=2?best:{a:'I could not find a reliable answer to that in the Pay101 website information. Please email support@pay101.uk for confirmation. I do not want to guess about pricing, integrations or live service availability.',link:'#contact'};
}
export default function Pay101Bot(){
 const [open,setOpen]=React.useState(false);
 const [draft,setDraft]=React.useState('');
 const [messages,setMessages]=React.useState([{who:'bot',text:'Hi! I’m Pay101Bot. Ask me about Pay101 solutions, markets, payment methods or getting started.'}]);
 const listRef=React.useRef(null);
 const clearChat=()=>{setMessages([{who:'bot',text:'Chat cleared. Hi! I’m Pay101Bot. What would you like to know about Pay101?'}]);setDraft('');};
 React.useEffect(()=>{if(open&&listRef.current)listRef.current.scrollTop=listRef.current.scrollHeight;},[messages,open]);
 function send(value){const q=(value||draft).trim();if(!q)return;const found=answer(q);setMessages(prev=>[...prev,{who:'user',text:q},{who:'bot',text:found.a,link:found.link}]);setDraft('');}
 return <div className="pay101botRoot">
  {open&&<section className="pay101botPanel" role="dialog" aria-label="Pay101Bot website assistant">
   <header className="pay101botHeader"><div className="pay101botAvatar"><Bot size={21}/></div><div><strong>Pay101Bot</strong><small>Website information assistant</small></div><div className="pay101botHeaderActions"><button type="button" onClick={clearChat} title="Clear conversation" aria-label="Clear conversation"><Trash2 size={18}/></button><button type="button" onClick={()=>setOpen(false)} aria-label="Close Pay101Bot"><X size={20}/></button></div></header>
   <div className="pay101botMessages" ref={listRef} aria-live="polite">{messages.map((m,i)=><div className={'pay101botBubble '+(m.who==='user'?'fromUser':'fromBot')} key={i}>{m.text}{m.link&&<a href={m.link} onClick={()=>setOpen(false)}>Explore section <ExternalLink size={13}/></a>}</div>)}</div>
   {messages.length===1&&<div className="pay101botPrompts">{['What is Pay101?','Which markets are shown?','How do I get started?'].map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div>}
   <form className="pay101botInput" onSubmit={e=>{e.preventDefault();send();}}><input aria-label="Ask Pay101Bot" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ask about Pay101..." maxLength={500}/><button type="submit" aria-label="Send message" disabled={!draft.trim()}><Send size={18}/></button></form>
   <p className="pay101botDisclaimer">Demo assistant · Answers based on website information, not live account data.</p>
  </section>}
  <button className="pay101botLauncher" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close Pay101Bot':'Chat with Pay101Bot'} aria-expanded={open}>{open?<X size={24}/>:<><MessageCircle size={23}/><span>Pay101Bot</span></>}</button>
 </div>;
}
