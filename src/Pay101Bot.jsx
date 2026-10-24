import React from 'react';
import { MessageCircle, X, Send, Bot, ExternalLink, Trash2 } from 'lucide-react';
import './pay101bot.css';

export default function Pay101Bot(){
 const [open,setOpen]=React.useState(false);
 const [draft,setDraft]=React.useState('');
 const [loading,setLoading]=React.useState(false);
 const [messages,setMessages]=React.useState([{who:'bot',text:'Hi! I’m Pay101Bot. Ask me about Pay101 solutions, markets, payment methods or getting started.'}]);
 const listRef=React.useRef(null);
 const clearChat=()=>{setMessages([{who:'bot',text:'Chat cleared. Hi! I’m Pay101Bot. What would you like to know about Pay101?'}]);setDraft('');};
 React.useEffect(()=>{if(open&&listRef.current)listRef.current.scrollTop=listRef.current.scrollHeight;},[messages,open]);
 async function send(value){const q=(value||draft).trim();if(!q||loading)return;const history=messages.slice(-6).map(m=>({role:m.who==='user'?'user':'assistant',text:m.text}));setMessages(prev=>[...prev,{who:'user',text:q}]);setDraft('');setLoading(true);try{const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history})});if(!response.ok)throw Error('Service unavailable');const data=await response.json();setMessages(prev=>[...prev,{who:'bot',text:data.answer||'I could not find an answer.',sources:data.sources||[]}])}catch(e){setMessages(prev=>[...prev,{who:'bot',text:'I could not connect to the website assistant. Please try again or email support@pay101.uk.'}])}finally{setLoading(false)}}
 return <div className="pay101botRoot">
  {open&&<section className="pay101botPanel" role="dialog" aria-label="Pay101Bot website assistant">
   <header className="pay101botHeader"><div className="pay101botAvatar"><Bot size={21}/></div><div><strong>Pay101Bot</strong><small>Website RAG assistant</small></div><div className="pay101botHeaderActions"><button type="button" onClick={clearChat} title="Clear conversation" aria-label="Clear conversation"><Trash2 size={18}/></button><button type="button" onClick={()=>setOpen(false)} aria-label="Close Pay101Bot"><X size={20}/></button></div></header>
   <div className="pay101botMessages" ref={listRef} aria-live="polite">{messages.map((m,i)=><div className={'pay101botMessageRow '+(m.who==='user'?'sent':'received')} key={i}><div className={'pay101botBubble '+(m.who==='user'?'fromUser':'fromBot')}>{m.text}{m.sources?.map((s,j)=><a key={j} href={s.url} onClick={()=>setOpen(false)}>{s.title} <ExternalLink size={13}/></a>)}</div></div>)}{loading&&<div className="pay101botMessageRow received"><div className="pay101botBubble fromBot" role="status">Searching Pay101 website information…</div></div>}</div>
   {messages.length===1&&<div className="pay101botPrompts">{['What is Pay101?','Which markets are shown?','How do I get started?'].map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div>}
   <form className="pay101botInput" onSubmit={e=>{e.preventDefault();send();}}><input aria-label="Ask Pay101Bot" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ask about Pay101..." maxLength={500}/><button type="submit" aria-label="Send message" disabled={!draft.trim()||loading}><Send size={18}/></button></form>
   <p className="pay101botDisclaimer">Website-grounded answers · AI when configured · No access to live account data.</p>
  </section>}
  <button className="pay101botLauncher" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close Pay101Bot':'Chat with Pay101Bot'} aria-expanded={open}>{open?<X size={24}/>:<><MessageCircle size={25}/></>}</button>
 </div>;
}
