import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import {ArrowRight, Check, Globe2, ShieldCheck, Zap, Sparkles, Menu, X, CreditCard, BarChart3, Code2, LockKeyhole, Landmark, Send, WalletCards, Eye, EyeOff, Mail} from 'lucide-react';
import {AreaChart, Area, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import './style.css';
import Pay101Bot from './Pay101Bot.jsx';



function ConsultationForm(){
 const [open,setOpen]=React.useState(false);
 const introTimer=React.useRef(null);
 React.useEffect(()=>{
  let shown=false;
  try{shown=sessionStorage.getItem('pay101-consult-intro')==='shown';if(!shown)sessionStorage.setItem('pay101-consult-intro','shown')}catch(e){}
  if(shown)return;
  setOpen(true);
  introTimer.current=setTimeout(()=>setOpen(false),4000);
  return()=>clearTimeout(introTimer.current);
 },[]);
 const [fields,setFields]=React.useState({name:'',email:'',industry:'',location:'',phone:''});
 const [notice,setNotice]=React.useState('');
 const update=(key,value)=>setFields(prev=>({...prev,[key]:value}));
 function submit(e){
  e.preventDefault();
  const body=['Consultation request for Pay101','','Name: '+fields.name,'Email: '+fields.email,'Industry: '+fields.industry,'Location: '+fields.location,'Phone: '+fields.phone].join('\\n');
  const url='mailto:support@pay101.uk?subject='+encodeURIComponent('Pay101 consultation request')+'&body='+encodeURIComponent(body);
  setNotice('Your email app will open with the consultation request. Please send the email to complete your enquiry.');
  window.location.href=url;
 }
 return <div className="p101ConsultWidget">
  {open&&<div className="p101ConsultBackdrop" aria-hidden="true"/>}
  {open&&<section className="p101ConsultPanel" role="dialog" aria-label="Request a consultation">
   <header className="p101ConsultHeader"><div><strong>Book a consultation</strong><small>Tell us about your business</small></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close consultation form"><X size={20}/></button></header>
   <form className="p101ConsultForm" onSubmit={submit}>
    <label htmlFor="consult-name">Name</label><input id="consult-name" autoComplete="name" value={fields.name} onChange={e=>update('name',e.target.value)} placeholder="Your full name" maxLength={100} required/>
    <label htmlFor="consult-email">Email</label><input id="consult-email" type="email" autoComplete="email" value={fields.email} onChange={e=>update('email',e.target.value)} placeholder="you@company.com" maxLength={150} required/>
    <label htmlFor="consult-industry">Industry</label><select id="consult-industry" value={fields.industry} onChange={e=>update('industry',e.target.value)} required><option value="">Select industry</option><option>E-commerce & Digital</option><option>Gaming</option><option>Media & Entertainment</option><option>Fintech & Payments</option><option>Other</option></select>
    <label htmlFor="consult-location">Location</label><input id="consult-location" autoComplete="address-level2" value={fields.location} onChange={e=>update('location',e.target.value)} placeholder="City, Country" maxLength={120} required/>
    <label htmlFor="consult-phone">Phone number</label><input id="consult-phone" type="tel" autoComplete="tel" value={fields.phone} onChange={e=>update('phone',e.target.value)} placeholder="+91 98765 43210" pattern="[+0-9() .-]{7,22}" title="Enter a valid phone number" required/>
    <p className="p101ConsultNote">Submitting opens your email app with these details. Nothing is sent until you send the email.</p>
    <button className="p101ConsultSubmit" type="submit">Prepare consultation request <ArrowRight size={17}/></button>
    {notice&&<p className="p101ConsultNotice" role="status">{notice}</p>}
   </form>
  </section>}
  <button className="p101ConsultTrigger" type="button" onClick={()=>{clearTimeout(introTimer.current);setOpen(v=>!v)}} aria-label={open?'Close consultation form':'Open consultation form'} aria-expanded={open} title="Book a consultation"><Mail size={24}/></button>
 </div>;
}

// WhatsApp-styled contact preview. No phone number or external messaging connection configured.
function WhatsAppPopup(){
 const [open,setOpen]=React.useState(false);
 return <div className="p101WhatsAppWidget">
  {open&&<section className="p101WhatsAppPanel" role="dialog" aria-label="WhatsApp contact preview">
   <div className="p101WhatsAppPanelHead"><span className="p101WhatsAppLogoSmall"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2.5A13.4 13.4 0 0 0 4.5 22.8L2.6 29.5l6.9-1.8A13.5 13.5 0 1 0 16 2.5Zm0 24.5a11 11 0 0 1-5.6-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4A11 11 0 1 1 16 27Zm6.1-8.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1a9 9 0 0 1-4.4-3.9c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.8s1.2 3.1 1.3 3.3c.2.2 2.3 3.6 5.6 5 .8.4 1.5.6 2 .7.9.3 1.8.2 2.5.2.8-.1 1.8-.8 2.1-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4Z"/></svg></span><div><strong>Pay101 on WhatsApp</strong><small>Contact preview</small></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close WhatsApp popup"><X size={18}/></button></div>
   <div className="p101WhatsAppPanelBody"><div className="p101WhatsAppBubble">Hello! Welcome to Pay101 👋<br/>Have a question about payment solutions? Our team can help.</div><p>WhatsApp messaging is not connected yet. A business number will be required to start a real WhatsApp conversation.</p></div>
   <a className="p101WhatsAppContact" href="mailto:support@pay101.uk?subject=Pay101%20WhatsApp%20Enquiry">Contact Pay101 by email <ArrowRight size={16}/></a>
  </section>}
  <button type="button" className="p101WhatsAppTrigger" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?'Close WhatsApp contact popup':'Open WhatsApp contact popup'}>
   <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2.5A13.4 13.4 0 0 0 4.5 22.8L2.6 29.5l6.9-1.8A13.5 13.5 0 1 0 16 2.5Zm0 24.5a11 11 0 0 1-5.6-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4A11 11 0 1 1 16 27Zm6.1-8.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1a9 9 0 0 1-4.4-3.9c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.8s1.2 3.1 1.3 3.3c.2.2 2.3 3.6 5.6 5 .8.4 1.5.6 2 .7.9.3 1.8.2 2.5.2.8-.1 1.8-.8 2.1-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4Z"/></svg>
  </button>
 </div>
}

const chart=[{m:'Jan',v:32},{m:'Feb',v:44},{m:'Mar',v:39},{m:'Apr',v:62},{m:'May',v:57},{m:'Jun',v:81},{m:'Jul',v:76},{m:'Aug',v:96}];
const tx=[['Payment received','Merchant checkout','+$2,840.00 USD','Success'],['Payment sent','Vendor transfer','-R$ 1.280,00','Success'],['Money received','Bank account','+A$4,820.00 AUD','Settled']];
const heroSlides=[{eyebrow:'PAYMENTS MADE SIMPLE',line1:'Make payments.',line2:'Make progress.',copy:'Accept money from customers, send payments to partners, and see what is happening in one clear place.',cta:'Explore Pay101'},{eyebrow:'LESS TIME CHASING PAYMENTS',line1:'Know what’s paid.',line2:'Know what’s next.',copy:'See incoming payments, outgoing transfers and when money is expected to reach your account.',cta:'See how it works'},{eyebrow:'PAYMENTS FOR MORE MARKETS',line1:'One clear view.',line2:'More ways to pay.',copy:'Explore familiar payment options and bank transfers for businesses serving customers in different markets.',cta:'Explore markets'}];

const paymentMethods=[
 {name:'UPI',brand:'upi',logoSrc:'https://commons.wikimedia.org/wiki/Special:FilePath/UPI-Logo-vector.svg',subtitle:'Instant bank payments',country:'India',flag:'🇮🇳',icon:<WalletCards size={23}/>},
 {name:'NPCI',brand:'npci',subtitle:'Payments infrastructure',country:'India',flag:'🇮🇳',icon:<Landmark size={23}/>},
 {name:'Paytm',brand:'paytm',logoSrc:'https://commons.wikimedia.org/wiki/Special:FilePath/Paytm_Logo_(standalone).svg',subtitle:'Digital wallet & payments',country:'India',flag:'🇮🇳',icon:<CreditCard size={23}/>},
 {name:'PhonePe',brand:'phonepe',logoSrc:'https://commons.wikimedia.org/wiki/Special:FilePath/PhonePe_Logo.svg',subtitle:'UPI & digital payments',country:'India',flag:'🇮🇳',icon:<WalletCards size={23}/>},
 {name:'GPay',brand:'googlepay',logoSrc:'https://commons.wikimedia.org/wiki/Special:FilePath/Google_Pay_Logo_(2020).svg',subtitle:'Google Pay · India',country:'India',flag:'🇮🇳',icon:<CreditCard size={23}/>},
 {name:'eSewa',brand:'esewa',logoSrc:'https://commons.wikimedia.org/wiki/Special:FilePath/Esewa_logo.webp',subtitle:'Digital wallet',country:'Nepal',flag:'🇳🇵',icon:<WalletCards size={23}/>},
 {name:'bKash',brand:'bkash',subtitle:'Mobile financial services',country:'Bangladesh',flag:'🇧🇩',icon:<Send size={23}/>},
 {name:'Pix',brand:'pix',logoSrc:'https://www.bcb.gov.br/content/estabilidadefinanceira/piximg/logo_pix.png',subtitle:'Instant payments',country:'Brazil',flag:'🇧🇷',icon:<Zap size={23}/>},
 {name:'Apple Pay',brand:'applepay',subtitle:'Digital wallet',country:'International',flag:'🌐',icon:<CreditCard size={23}/>},
 {name:'Google Pay',brand:'googlepay',logoSrc:'https://commons.wikimedia.org/wiki/Special:FilePath/Google_Pay_Logo_(2020).svg',subtitle:'Digital wallet',country:'International',flag:'🌐',icon:<CreditCard size={23}/>}
];

function App(){
 const [menu,setMenu]=React.useState(false);
 const [solutionsOpen,setSolutionsOpen]=React.useState(false);
 const [solutionTab,setSolutionTab]=React.useState('collect');
 const [activeSlide,setActiveSlide]=React.useState(0);
 const [socialRailVisible,setSocialRailVisible]=React.useState(true);
 React.useEffect(()=>{
  let lastY=window.scrollY;
  let ticking=false;
  const onScroll=()=>{
   if(ticking)return;
   ticking=true;
   window.requestAnimationFrame(()=>{
    const y=window.scrollY;
    const delta=y-lastY;
    if(y<120)setSocialRailVisible(true);
    else if(delta>5)setSocialRailVisible(false);
    else if(delta< -5)setSocialRailVisible(true);
    lastY=y;
    ticking=false;
   });
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  return()=>window.removeEventListener('scroll',onScroll);
 },[]);
 React.useEffect(()=>{const timer=setInterval(()=>setActiveSlide(i=>(i+1)%heroSlides.length),5000);return ()=>clearInterval(timer)},[]);
 const slide=heroSlides[activeSlide];
 return <div className="app">
  <header className="p101Header">
   <div className="p101HeaderInner">
    <a className="brand" href="/" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a>
    <nav className={`p101Nav ${menu?'mobileOpen':''}`} aria-label="Main navigation">
     <a className="p101NavLink" href="#about" onClick={()=>setMenu(false)}>About us</a>
     <div className="p101NavItem">
      <button className="p101NavLink" onClick={()=>setSolutionsOpen(v=>!v)} onMouseEnter={()=>setSolutionsOpen(true)} aria-expanded={solutionsOpen}>Solutions <span>⌄</span></button>
      {solutionsOpen&&<div className="p101Mega" onMouseLeave={()=>setSolutionsOpen(false)}>
       <div className="p101MegaTabs">{[['collect','Collect','Accept customer payments'],['payout','Pay out','Move money to partners'],['settle','Settle','Know when funds arrive']].map(([key,label,sub])=><button key={key} className={solutionTab===key?'active':''} onMouseEnter={()=>setSolutionTab(key)} onClick={()=>setSolutionTab(key)}>{label}<small>{sub}</small></button>)}</div>
       <div className="p101MegaPanel">{(solutionTab==='collect'?[['Payin Solutions','Accept customer payments online','#solutions'],['UPI Payments','Fast, familiar digital payments','#solutions']]:solutionTab==='payout'?[['Payout Solutions','Pay vendors, partners and customers','#solutions'],['IMPS Transfers','Quick bank-to-bank transfers','#solutions'],['NEFT & RTGS','Bank transfer workflows','#solutions']]:[['Instant Settlements','See when funds are available','#solutions']]).map(([title,description,url])=><a key={title} href={url} onClick={()=>{setSolutionsOpen(false);setMenu(false)}}><span className="p101MegaIcon"><ArrowRight size={18}/></span><span><strong>{title}</strong><small>{description}</small></span></a>)}</div>
      </div>}
     </div>
     
     <div className="p101NavItem p101HoverDrop"><button className="p101NavLink">Markets <span>⌄</span></button><div className="p101Drop p101MarketsDrop">{[['India','in','UPI and bank transfers'],['Nepal','np','Local payment options'],['Bhutan','bt','Regional payment options'],['Brazil','br','Pix payment examples'],['Australia','au','AUD payment examples']].map(([name,iso,desc])=><a key={name} href="#markets" onClick={()=>setMenu(false)}><img src={`https://flagcdn.com/w40/${iso}.png`} alt="" loading="lazy"/><span><strong>{name}</strong><small>{desc}</small></span></a>)}<a href="#markets" onClick={()=>setMenu(false)}><span className="p101MarketMoreGlyph"><Globe2 size={21}/></span><span><strong>Many more</strong><small>Ask us about additional markets</small></span></a><small className="p101DropNote">Markets shown for demonstration. Confirm availability with Pay101.</small></div></div>
     <a className="p101NavLink" href="/how-it-works" onClick={()=>setMenu(false)}>How it works</a>
     <a className="p101NavLink" href="#developers" onClick={()=>setMenu(false)}>Developers</a>
     <a className="p101NavLink" href="/pricing" onClick={()=>setMenu(false)}>Pricing</a>
     <div className="p101NavItem p101HoverDrop p101CompanyNav"><button className="p101NavLink">Company <span>⌄</span></button><div className="p101Drop p101CompanyDrop"><div className="p101CompanyLinks"><a href="/blog" onClick={()=>setMenu(false)}><span className="p101CompanyIcon"><Code2 size={19}/></span><span><strong>Blog</strong><small>Payment guides and product news</small></span></a><a href="#security" onClick={()=>setMenu(false)}><span className="p101CompanyIcon"><ShieldCheck size={19}/></span><span><strong>Security</strong><small>How we protect your money</small></span></a></div><div className="p101CompanyContact"><span className="p101CompanyMail"><Mail size={20}/></span><strong>Talk to our team</strong><p>Ask which payment options fit your business.</p><a href="#contact" onClick={()=>setMenu(false)}>Contact us <ArrowRight size={15}/></a></div></div></div>
    </nav>
    <div className="p101Actions"><a className="p101Signin" href="/login">Sign in</a><a className="primary small" href="/signup">Get started <ArrowRight size={15}/></a></div>
    <button className="p101Burger" type="button" onClick={()=>setMenu(v=>!v)} aria-label="Toggle navigation" aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
   </div>
  </header>
  <main>
   <section className="hero p101FullVideoHero">
    <video className="p101FullHeroBackground" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/assets/pay101_hero_cropped_1080p.mp4" type="video/mp4"/></video>
    <div className="p101FullHeroShade" aria-hidden="true"/>
    <div className="orb orb1"/><div className="orb orb2"/>
    <div className="heroCopy">
     <div className="eyebrow"><span className="pulse"/> {slide.eyebrow}</div>
     <h1 key={activeSlide} className="heroHeadline">{slide.line1}<br/><em>{slide.line2}</em></h1>
     <p key={`copy-${activeSlide}`} className="heroDescription">{slide.copy}</p>
     <div className="heroCtas"><a className="primary" href="#solutions">{slide.cta} <ArrowRight size={17}/></a><a className="play" href="#rails"><span>→</span> Explore solutions</a></div>
     <div className="heroSlider" aria-label="Choose hero slide">{heroSlides.map((item,i)=><button key={item.eyebrow} className={`heroDot ${i===activeSlide?'active':''}`} onClick={()=>setActiveSlide(i)} aria-label={`Show slide ${i+1}`} aria-pressed={i===activeSlide}/>)}</div>
     <div className="trust"><div className="avatars"><i/><i/><i/><i/></div><span><b>One platform</b> for your payment operations</span></div>
    </div>
   </section>
   <section id="about" className="aboutContactSection"><div className="aboutContactLabel">ABOUT PAY101</div><div className="aboutContactGrid"><div><h2>Payments made simpler for growing businesses.</h2></div><div><p>Pay101 brings the ideas of payins, payouts, settlement workflows and payment visibility into one connected experience. Explore payment options across markets and discover how a streamlined platform could support your business.</p><small>This website is a demonstration concept. Payment methods and integrations shown are illustrative and subject to confirmation.</small></div></div></section>

   <section className="dashboardShowcase"><div className="dashboardShowcaseIntro"><span className="kicker">GLOBAL PAYMENT EXPERIENCE</span><h2>One platform. <em>More possibilities.</em></h2><p>Explore a sample multi-currency payment dashboard with illustrative transaction activity and monitoring insights.</p></div><Dashboard/></section>

   <section id="markets" className="marketsSection">
    <div className="marketsIntro"><span className="kicker">EXPLORE MARKETS</span><h2>Payments that feel <em>local.</em></h2><p>Customers like to pay in familiar ways. Explore the markets we are considering and ask our team which options are available for your business.</p></div>
    <div className="marketGrid">
     <a href="mailto:support@pay101.uk?subject=Pay101%20India%20market"><span className="marketFlag"><img src="https://flagcdn.com/w80/in.png" alt="India flag" loading="lazy"/></span><div><b>India</b><small>UPI and bank transfers</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Nepal%20market"><span className="marketFlag"><img src="https://flagcdn.com/w80/np.png" alt="Nepal flag" loading="lazy"/></span><div><b>Nepal</b><small>Explore local payment options</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Bhutan%20market"><span className="marketFlag"><img src="https://flagcdn.com/w80/bt.png" alt="Bhutan flag" loading="lazy"/></span><div><b>Bhutan</b><small>Explore local payment options</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Brazil%20market"><span className="marketFlag"><img src="https://flagcdn.com/w80/br.png" alt="Brazil flag" loading="lazy"/></span><div><b>Brazil</b><small>BRL and Pix examples</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Australia%20market"><span className="marketFlag"><img src="https://flagcdn.com/w80/au.png" alt="Australia flag" loading="lazy"/></span><div><b>Australia</b><small>AUD currency examples</small></div><ArrowRight size={17}/></a>
     <a className="marketMoreCard" href="mailto:support@pay101.uk?subject=Pay101%20More%20Markets"><span className="marketFlag marketMoreIcon"><Globe2 size={25}/></span><div><b>Many more</b><small>Ask us about additional markets</small></div><ArrowRight size={17}/></a>
    </div>
    <p className="marketDisclaimer">Market examples are for demonstration. Payment methods and country availability must be confirmed with Pay101.</p>
   </section>

   <section id="rails" className="rails paymentMethodsSection">
    <div className="paymentMethodsIntro"><span>PAYMENT SYSTEM</span><strong>Familiar ways to pay, across markets.</strong><p>Explore widely recognized payment networks, wallets and payment methods from around the world.</p><small>Illustrative examples only · Integration and availability are not confirmed.</small></div>
    <div className="paymentMethodsMarquee" aria-label="Illustrative payment methods moving left to right">
     <div className="paymentMethodsTrack">
      {[0,1].map(copy=><div className="paymentMethodsLoop" key={copy} aria-hidden={copy===1}>
       {paymentMethods.map(item=><div className={`paymentMethodCard paymentBrand-${item.brand}`} key={item.name}>
        <span className={`paymentMethodIcon ${item.logoSrc?"paymentBrandIcon":""}`}>{item.logoSrc?<img src={item.logoSrc} alt={`${item.name} logo`} loading="lazy"/>:item.icon}</span>
        
       </div>)}
      </div>)}
     </div>
    </div>
   </section>

   <section id="solutions" className="section">
    <div className="sectionHead"><div><span className="kicker">PAY101 SOLUTIONS</span><h2>Payment flows built for <em>business.</em></h2></div><p>Bring collections, payouts and settlement operations into a clear, connected payment experience.</p></div>
    <div className="featureGrid">
     <Feature icon={<Zap/>} title="Instant Settlements" text="Streamline settlement workflows and get clearer visibility into when funds are available."/>
     <Feature icon={<CreditCard/>} title="Payin Solutions" text="Accept customer payments through convenient digital payment flows designed for modern businesses."/>
     <Feature icon={<Send/>} title="Payout Solutions" text="Move funds to vendors, partners and customers through a unified payout workflow."/>
     <Feature icon={<WalletCards/>} title="UPI Payments" text="Support UPI payment flows for fast and familiar digital transactions."/>
     <Feature icon={<Send/>} title="IMPS Transfers" text="Enable quick bank-to-bank transfers through the IMPS rail."/>
     <Feature icon={<Landmark/>} title="NEFT & RTGS" text="Support bank transfer workflows through NEFT and RTGS."/>
    </div>
   </section>

   

   <section className="split">
    <div className="splitVisual">
     <div className="miniCard"><div className="miniTop"><span>PAY101 PAYMENT HUB</span><span className="liveDot">● LIVE</span></div><strong>$248,920.42</strong><div className="miniChange">Illustrative multi-currency activity <small>demo view</small></div><div className="currencyChips"><span><b>Nu.</b> BTN</span><span><b>रू</b> NPR</span><span><b>R$</b> BRL</span><span><b>A$</b> AUD</span><span><b>$</b> USD</span></div><div className="miniBars">{[30,52,42,67,54,80,63,91,76,100].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div>
     <div className="floatTag tag1"><Check size={15}/> Settlement initiated</div><div className="floatTag tag2">UPI · Bank transfers</div>
    </div>
    <div className="splitCopy"><span className="kicker">ONE CONNECTED WORKFLOW</span><h2>From payment to <em>settlement.</em></h2><p>Keep your payment operations visible from collection through payout and settlement.</p><ul><li><Check/> Real-time transaction visibility</li><li><Check/> Payin and payout workflows</li><li><Check/> Settlement status tracking</li><li><Check/> Clear reporting for operations</li></ul><button className="textBtn">Explore Pay101 solutions <ArrowRight size={17}/></button></div>
   </section>


   <section id="developers" className="p101DeveloperSection" aria-labelledby="p101DeveloperTitle">
    <div className="p101DeveloperInner">
     <div className="p101DeveloperIntro">
      <span className="kicker">FOR DEVELOPERS</span>
      <h2 id="p101DeveloperTitle">Build payment experiences <em>with confidence.</em></h2>
      <p>Explore how a developer-friendly Pay101 integration could connect payment collection, payouts, and transaction updates with your application.</p>
      <div className="p101DeveloperActions">
       <a className="primary" href="mailto:support@pay101.uk?subject=Pay101%20Developer%20Integration%20Enquiry">Request API access <ArrowRight size={17}/></a>
       <a className="p101DeveloperSecondary" href="/how-it-works">How it works <ArrowRight size={16}/></a>
      </div>
      <small>Integration preview only. Production APIs, credentials, webhooks and documentation are available only if confirmed by the Pay101 team.</small>
     </div>
     <div className="p101DeveloperPanel">
      <div className="p101DeveloperPanelHead"><Code2 size={21}/><strong>Integration workflow</strong><span>CONCEPT</span></div>
      <div className="p101DeveloperSteps">
       <div><span>01</span><div><strong>Discuss your use case</strong><p>Tell us your business model, region and payment requirements.</p></div></div>
       <div><span>02</span><div><strong>Confirm integration options</strong><p>Review supported methods, security requirements and available documentation with our team.</p></div></div>
       <div><span>03</span><div><strong>Plan testing and launch</strong><p>Agree on test access, transaction status handling and go-live checks when supported.</p></div></div>
      </div>
      <div className="p101DeveloperPanelFoot"><ShieldCheck size={17}/> No live credentials or endpoints are published in this preview.</div>
     </div>
    </div>
   </section>
   <section id="security" className="security"><div><span className="kicker">TRUST BY DESIGN</span><h2>Built with <em>security</em> in mind.</h2><p>Keep payment operations protected with access controls, transaction visibility and security-focused infrastructure.</p></div><div className="securityGrid"><Feature icon={<LockKeyhole/>} title="Secure access" text="Role-aware access and controlled payment operations."/><Feature icon={<ShieldCheck/>} title="Protected flows" text="Security-focused controls across payment workflows."/><Feature icon={<BarChart3/>} title="Full visibility" text="Track transactions, payouts and settlement activity in one place."/></div></section>

   <section id="contact" className="contactSection"><div><span className="aboutContactLabel">CONTACT OUR TEAM</span><h2>Let's talk payments.</h2><p>Have questions about Pay101 or want to discuss payment solutions for your business? Get in touch with our team.</p></div><a className="primary" href="mailto:support@pay101.uk?subject=Pay101%20Business%20Enquiry">Email support@pay101.uk <ArrowRight size={17}/></a></section>

   <section className="cta"><div className="ctaGlow"/><span className="kicker">READY TO MOVE MONEY?</span><h2>Build your payment flow<br/>with <em>Pay101.</em></h2><p>Bring payins, payouts and settlement operations together in one modern platform.</p><a className="primary" href="/signup">Get started with Pay101 <ArrowRight size={17}/></a></section>
  </main>
  <div className={"p101SocialRail p101SocialBar" + (socialRailVisible ? "" : " p101SocialBarHidden")} aria-label="Social media bar; official profile links pending">
    <span className="p101SocialRailItem" title="LinkedIn — link pending"><span className="p101SocialGlyph p101Linkedin">in</span></span>
    <span className="p101SocialRailItem" title="Instagram — link pending"><span className="p101SocialGlyph p101Instagram">◎</span></span>
    <span className="p101SocialRailItem" title="X — link pending"><span className="p101SocialGlyph p101X">𝕏</span></span>
    <span className="p101SocialRailItem" title="YouTube — link pending"><span className="p101SocialGlyph p101Youtube">▶</span></span>
   </div>
  <Pay101Bot/>
  <WhatsAppPopup/>
  <ConsultationForm/>

  <section id="faqs" className="p101FaqSection"><div className="p101FaqInner"><span className="kicker">COMMON QUESTIONS</span><h2>Frequently asked <em>questions.</em></h2><details><summary>What is Pay101?</summary><p>Pay101 presents payment collection, payouts and settlement workflows in one connected experience. This website is a demo concept.</p></details><details><summary>Which payment methods are shown?</summary><p>The demo showcases methods such as UPI, Pix, PayID, cards and regional wallet or bank transfer options. Contact our team to confirm availability.</p></details><details><summary>How can I get started?</summary><p>Use the contact section to discuss your business needs and available payment options with the Pay101 team.</p></details><details><summary>How do I request a Pay101 merchant account?</summary><p>Choose Get started to open the merchant registration demo, or contact the Pay101 team to discuss onboarding. Live account creation is not enabled in this demo.</p></details><details><summary>Can Pay101 support payins and payouts?</summary><p>The demo illustrates both customer collections and outgoing payment workflows. Ask the team to confirm which services are currently offered.</p></details><details><summary>Which countries and currencies are supported?</summary><p>India, Nepal, Bhutan, Brazil and Australia appear as illustrative market examples. Actual country and currency coverage must be confirmed with Pay101.</p></details><details><summary>How long do settlements take?</summary><p>Settlement timing depends on the payment method, banking partners and commercial arrangement. Contact Pay101 for verified timelines.</p></details><details><summary>Does Pay101 offer API integration?</summary><p>The website shows a conceptual developer integration experience. Request current API documentation and integration options from the Pay101 team.</p></details><details><summary>Are the dashboard figures real transaction data?</summary><p>No. All amounts, charts, success rates and transaction examples on this demo are illustrative, not live merchant performance metrics.</p></details><details><summary>How do I get help with payments or onboarding?</summary><p>Use the contact section or email support@pay101.uk with your business question.</p></details></div></section>
   <footer className="p101Footer p101ReferenceFooter" id="footer">
    <div className="p101FooterGrid">
     <div className="p101FooterBrand">
      <a className="brand" href="/" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a>
      <p>Accept money from customers, send payments to partners, and see what is happening in one clear place.</p>
      <div className="p101FooterSocial" aria-label="Social media icons">
       <span aria-label="LinkedIn" title="LinkedIn">in</span><span aria-label="X" title="X">𝕏</span><span aria-label="Instagram" title="Instagram">◎</span><span aria-label="YouTube" title="YouTube">▶</span>
      </div>
      <a className="primary small p101FooterCta" href="/signup">Get started <ArrowRight size={16}/></a>
     </div>
     <div className="p101FooterCol"><h4>Solutions</h4><a href="/#solutions">Payin Solutions</a><a href="/#solutions">Payout Solutions</a><a href="/#solutions">UPI Payments</a><a href="/#solutions">IMPS Transfers</a><a href="/#solutions">NEFT &amp; RTGS</a><a href="/#solutions">Instant Settlements</a></div>
     <div className="p101FooterCol"><h4>Industries</h4><a href="/#industries">E-commerce</a><a href="/#industries">Gaming</a><a href="/#industries">Media &amp; Entertainment</a><a href="/#industries">Travel</a><a href="/#industries">Education</a></div>
     <div className="p101FooterCol"><h4>Markets</h4><a href="/#markets">India</a><a href="/#markets">Nepal</a><a href="/#markets">Bhutan</a><a href="/#markets">Brazil</a><a href="/#markets">Australia</a></div>
     <div className="p101FooterCol"><h4>Company</h4><a href="/#about">About us</a><a href="/how-it-works">How it works</a><a href="/#developers">Developers</a><a href="/#security">Security</a><a href="/#blog">Blog</a><a href="/#contact">Contact</a></div>
    </div>
    <div className="p101FooterBottom"><span>© 2026 Pay101. All rights reserved.</span><div><a href="mailto:support@pay101.uk?subject=Privacy%20Policy%20Request">Privacy policy</a><a href="mailto:support@pay101.uk?subject=Terms%20of%20Service%20Request">Terms of service</a></div></div>
   </footer>
 </div>
}

const globeMethods=[
 {flag:'🇮🇳',country:'India',method:'UPI',iso:'in',logo:'UPI',logoUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/UPI-Logo-vector.svg',pos:'globePinIndia'},
 {flag:'🇧🇷',country:'Brazil',method:'Pix',iso:'br',logo:'Pix',logoUrl:'https://www.bcb.gov.br/content/estabilidadefinanceira/piximg/logo_pix.png',pos:'globePinBrazil'},
 {flag:'🇺🇸',country:'United States',method:'Cards',iso:'us',logo:'Cards',logoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYyLHuzjcWr5ziwsakqz3gzylUdQ_pdv2-mamTg6LX0iCTDZJ_NHXJOdLF&s=10',pos:'globePinUSA'},
 {flag:'🇦🇺',country:'Australia',method:'PayID',iso:'au',logo:'PayID',logoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh_0ML0tDOp5uPgq4_SQF3oaqvaDJ-OqONyI2VQe_S9w&s=10',pos:'globePinAustralia'},
 {flag:'🇳🇵',country:'Nepal',method:'eSewa',iso:'np',logo:'eSewa',logoUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Esewa_logo.webp',pos:'globePinNepal'},
 {flag:'🇧🇹',country:'Bhutan',method:'Bank transfer',iso:'bt',logo:'Bank',pos:'globePinBhutan'}
];
function PaymentGlobe(){
 const [videoReady,setVideoReady]=React.useState(true);
 return <div className="globeStage globeVideoStage" aria-label="Animated holographic global payments video">
  {videoReady?<video className="globeHeroVideo" autoPlay muted loop playsInline preload="metadata" aria-label="Holographic globe and digital payment interface animation" onError={()=>setVideoReady(false)}><source src="/assets/pay101-holographic-globe.mp4" type="video/mp4"/></video>:<div className="globeVideoFallback"><Globe2 size={88}/><span>GLOBAL PAYMENT NETWORK</span></div>}
  <div className="p101MotionGrid" aria-hidden="true"/>
  <div className="p101MotionSweep" aria-hidden="true"/>
  <div className="p101MotionChip p101MotionChipTop" aria-hidden="true"><span className="p101MotionDot"/>GLOBAL NETWORK <span className="p101MotionBars"><i/><i/><i/><i/></span></div>
  <div className="p101MotionChip p101MotionChipLeft" aria-hidden="true"><span className="p101MotionGlyph">↗</span><span><strong>PAYINS</strong><small>Collect seamlessly</small></span></div>
  <div className="p101MotionChip p101MotionChipRight" aria-hidden="true"><span className="p101MotionGlyph">⇄</span><span><strong>PAYOUTS</strong><small>Move money globally</small></span></div>
  <div className="p101MotionOrbit p101MotionOrbitOne" aria-hidden="true"/><div className="p101MotionOrbit p101MotionOrbitTwo" aria-hidden="true"/>
  <div className="globeVideoCaption">PAYMENTS WITHOUT BORDERS</div>
  <div className="globeFootnote">Concept visualization · Payment method availability subject to confirmation</div>
 </div>
}

function Feature({icon,title,text}){return <motion.div className="feature" whileHover={{y:-5}}><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p><ArrowRight className="featureArrow" size={17}/></motion.div>}

const currencySlides=[
 {code:'BTN',name:'Bhutanese Ngultrum',symbol:'Nu.',amount:'Nu. 184,290',volume:'Nu. 2,840',region:'BHUTAN',tx:[['Payment received','Merchant checkout','+Nu. 2,840','Success'],['Payment sent','Vendor transfer','-Nu. 1,280','Success'],['Money received','Bank account','+Nu. 4,820','Settled']]},
 {code:'NPR',name:'Nepalese Rupee',symbol:'रू',amount:'रू 18,42,900',volume:'रू 28,400',region:'NEPAL',tx:[['Payment received','Merchant checkout','+रू 28,400','Success'],['Payment sent','Vendor transfer','-रू 12,800','Success'],['Money received','Bank account','+रू 48,200','Settled']]},
 {code:'BRL',name:'Brazilian Real',symbol:'R$',amount:'R$ 184.290,00',volume:'R$ 2.840,00',region:'BRAZIL',tx:[['Payment received','Merchant checkout','+R$ 2.840,00','Success'],['Payment sent','Vendor transfer','-R$ 1.280,00','Success'],['Money received','Bank account','+R$ 4.820,00','Settled']]},
 {code:'AUD',name:'Australian Dollar',symbol:'A$',amount:'A$ 184,290',volume:'A$ 2,840',region:'AUSTRALIA',tx:[['Payment received','Merchant checkout','+A$ 2,840','Success'],['Payment sent','Vendor transfer','-A$ 1,280','Success'],['Money received','Bank account','+A$ 4,820','Settled']]},
 {code:'USD',name:'US Dollar',symbol:'$',amount:'$ 184,290',volume:'$ 2,840',region:'GLOBAL EXAMPLE',tx:[['Payment received','Merchant checkout','+$2,840.00','Success'],['Payment sent','Vendor transfer','-$1,280.00','Success'],['Money received','Bank account','+$4,820.00','Settled']]},
 {code:'INR',name:'Indian Rupee',symbol:'₹',amount:'₹ 1,84,290',volume:'₹ 2,840',region:'INDIA',tx:[['Payment received','Merchant checkout','+₹ 2,840','Success'],['Payment sent','Vendor transfer','-₹ 1,280','Success'],['Money received','Bank account','+₹ 4,820','Settled']]}
];
function Dashboard(){
 const [activeCurrency,setActiveCurrency]=React.useState(0);
 React.useEffect(()=>{const timer=setInterval(()=>setActiveCurrency(i=>(i+1)%currencySlides.length),5000);return ()=>clearInterval(timer)},[]);
 const current=currencySlides[activeCurrency];
 return <motion.div className="dashboard" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
 <div className="dashGlow"/>
 <div className="dashHead"><div><small>PAYMENT OVERVIEW · {current.region}</small><h3>Pay101 dashboard</h3></div><div className="user">P</div></div>
 <div className="currencySpotlight" key={current.code}><div><span>{current.code} · {current.name}</span><strong>{current.amount}</strong><small>Example total</small></div><div className="currencyMark">{current.symbol}</div></div>
 <div className="currencyProgress" aria-label="Currency rotation">{currencySlides.map((item,i)=><button key={item.code} onClick={()=>setActiveCurrency(i)} className={i===activeCurrency?'active':''} aria-label={`Show ${item.name}`} aria-pressed={i===activeCurrency}/>)}</div>
 <div className="stats"><div><span>Example payment</span><strong>{current.volume}</strong><b>● {current.code} example</b></div><div><span>Success rate</span><strong>98.7%</strong><b>↑ 1.2%</b></div></div>
 <div className="chartBox"><div className="chartTitle"><span>Payment activity</span><small>{current.code} · demo</small></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0878f9" stopOpacity=".28"/><stop offset="100%" stopColor="#0878f9" stopOpacity="0"/></linearGradient></defs><XAxis dataKey="m" hide/><Tooltip contentStyle={{background:'#fff',border:'1px solid #dce6ea',borderRadius:10,color:'#10202b'}}/><Area type="monotone" dataKey="v" stroke="#0878f9" strokeWidth={3} fill="url(#fill)"/></AreaChart></ResponsiveContainer></div></div>

 </motion.div>
}


function MerchantLogin(){
 React.useEffect(()=>{document.title='Merchant Login | Pay101';},[]);
 const [showPassword,setShowPassword]=React.useState(false);
 const [email,setEmail]=React.useState('');
 const [password,setPassword]=React.useState('');
 const [remember,setRemember]=React.useState(true);
 const [message,setMessage]=React.useState('');
 function handleSubmit(e){e.preventDefault();setMessage('This is a UI preview. Connect the merchant authentication technical connection before using real accounts.');}
 return <div className="merchantPage">
  <header className="merchantHeader"><a href="/" className="merchantBrand"><img src="/assets/pay101-logo.png" alt="Pay101"/></a><div className="merchantHeaderRight"><span>New to Pay101?</span><a href="/signup">Sign up <ArrowRight size={15}/></a></div></header>
  <main className="merchantLayout">
   <section className="merchantIntro"><div className="merchantEyebrow"><span/> MERCHANT PORTAL</div><h1>Your payments.<br/><em>Your business.</em></h1><p>Sign in to manage your payment activity, monitor settlements and keep track of your transactions in one place.</p>
    <div className="merchantPreview"><div className="previewTop"><div><span>ACCOUNT OVERVIEW</span><strong>Payment activity</strong></div><div className="previewAvatar">P</div></div><div className="previewStats"><div><span>Payment methods</span><strong>UPI · IMPS</strong><small>NEFT · RTGS</small></div><div><span>Portal access</span><strong>Merchant</strong><small>Account workspace</small></div></div><div className="previewLine"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="previewFoot"><span><i/> Payment monitoring</span><span>Pay101 Portal</span></div></div>
    <div className="merchantBenefits"><span><ShieldCheck size={17}/> Payment visibility</span><span><LockKeyhole size={17}/> Account access</span><span><BarChart3 size={17}/> Settlement overview</span></div>
   </section>
   <section className="loginPanel"><div className="loginPanelHead"><div className="loginIcon"><LockKeyhole size={21}/></div><span className="loginTag">MERCHANT SIGN IN</span><h2>Welcome back</h2><p>Enter your account details to continue.</p></div>
    <form className="loginForm" onSubmit={handleSubmit}>
     <label htmlFor="merchant-email">Email address</label><div className="loginInput"><Mail size={17}/><input id="merchant-email" type="email" autoComplete="username" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
     <div className="passwordLabel"><label htmlFor="merchant-password">Password</label><a href="mailto:support@pay101.uk?subject=Merchant%20password%20reset">Forgot password?</a></div><div className="loginInput"><LockKeyhole size={17}/><input id="merchant-password" type={showPassword?'text':'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="passwordToggle" type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
     <label className="rememberRow"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> <span>Remember me on this device</span></label>
     <button className="loginSubmit" type="submit">Sign in to merchant portal <ArrowRight size={17}/></button>
     {message&&<p className="loginNotice" role="status">{message}</p>}
    </form>
    <div className="loginHelp">New merchant? <a href="/signup">Sign up for access</a></div><div className="loginHelp">Already need help? <a href="mailto:support@pay101.uk?subject=Merchant%20portal%20access">Contact support</a></div>
    <div className="loginSecurity"><LockKeyhole size={14}/> Never share your password or one-time codes.</div>
   </section>
  </main>
  <footer className="merchantFooter"><span>© 2026 Pay101. Merchant portal preview.</span><div><a href="/">Pay101 home</a><a href="mailto:support@pay101.uk">Help & support</a></div></footer>
 </div>
}

const segmentPages={
'/industries/media-entertainment':{label:'MEDIA & ENTERTAINMENT',title:'Payment processing for media & entertainment',pain:'Subscription collections and creator payouts can leave teams with disconnected transaction records.',proof:'Illustrative workflow: track a subscription payment, its status and a creator payout together.',points:['Subscription payment journeys','Creator payout visibility','Transaction status tracking']},
'/industries/gaming':{label:'GAMING',title:'Payment gateway for gaming businesses',pain:'Player top-ups and withdrawal requests can be difficult to monitor across separate payment workflows.',proof:'Illustrative workflow: see a player top-up, its payment status and a withdrawal request in one dashboard concept.',points:['Player top-up workflows','Withdrawal tracking','Local payment options']},
'/industries/digital-businesses':{label:'DIGITAL BUSINESSES',title:'Payment solutions for digital businesses',pain:'Online businesses often manage collections and partner payouts across disconnected tools.',proof:'Illustrative workflow: follow a customer payment and partner payout through a unified operational view.',points:['Digital checkout flows','Partner payouts','Reconciliation visibility']}
};
function SegmentLanding({segment}){
 React.useEffect(()=>{document.title=segment.title+' | Pay101';const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=segment.pain},[segment]);
 return <div className="app p101SegmentPage">
 <header className="p101Header"><div className="p101HeaderInner"><a className="brand" href="/"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a><nav className="p101SegmentNav"><a href="/">Home</a><a href="/#solutions">Solutions</a><a href="/#industries">Industries</a></nav><a className="primary small" href="mailto:support@pay101.uk?subject=Pay101%20Sales%20Enquiry">Talk to sales <ArrowRight size={16}/></a></div></header>
 <main><section className="p101SegmentHero"><div className="p101SegmentWrap"><span className="kicker">{segment.label}</span><h1>{segment.title}</h1><p>Explore clearer payment journeys and operational visibility for {segment.label.toLowerCase()}.</p><a className="primary" href={'mailto:support@pay101.uk?subject='+encodeURIComponent('Pay101 sales enquiry - '+segment.label)}>Talk to sales <ArrowRight size={17}/></a><a className="p101SegmentBack" href="/#industries">Explore other industries →</a></div></section>
 <section className="p101SegmentWrap p101SegmentContent"><div className="p101SegmentBlock"><span className="kicker">ONE PAIN POINT</span><h2>The challenge</h2><p>{segment.pain}</p></div><div className="p101SegmentBlock"><span className="kicker">ONE PROOF POINT</span><h2>Example payment workflow</h2><p>{segment.proof}</p><small>Illustrative concept only; not a verified customer result or performance metric.</small></div></section>
 <section className="p101SegmentWrap p101SegmentUseCases"><span className="kicker">USE CASES</span><h2>What this could support</h2><div className="p101SegmentCards">{segment.points.map(p=><div key={p}><Check size={20}/><span>{p}</span></div>)}</div></section>
 <section className="p101SegmentWrap p101SegmentCTA"><h2>Discuss your payment requirements</h2><p>Confirm supported methods, integrations and commercial terms directly with the Pay101 team.</p><a className="primary" href={'mailto:support@pay101.uk?subject='+encodeURIComponent('Pay101 sales enquiry - '+segment.label)}>Talk to sales <ArrowRight size={17}/></a></section></main>
 <footer className="p101Footer"><div className="p101FooterGrid"><div className="p101FooterBrand"><a className="brand" href="/"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a><h3>Payments, simplified.</h3><p>Making payment experiences easier to navigate, one step at a time.</p></div><div className="p101FooterCol"><h4>Explore</h4><a href="/">Home</a><a href="/#solutions">Solutions</a><a href="/#industries">Industries</a></div><div className="p101FooterCol"><h4>Industries</h4><a href="/industries/media-entertainment">Media &amp; Entertainment</a><a href="/industries/gaming">Gaming</a><a href="/industries/digital-businesses">Digital Businesses</a></div><div className="p101FooterCol"><h4>Support</h4><a href="mailto:support@pay101.uk">Contact Us</a><a href="mailto:support@pay101.uk?subject=Help">Help &amp; Support</a></div></div><div className="p101FooterBottom"><span>© 2026 Pay101. All rights reserved.</span></div></footer></div>
}

function MarketingBlog(){return <div className="app p101SegmentPage"><header className="p101Header"><div className="p101HeaderInner"><a className="brand" href="/"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a><a className="p101NavLink" href="/">← Back to home</a></div></header><main><section className="p101SegmentHero"><div className="p101SegmentWrap"><span className="kicker">RESOURCES</span><h1>Pay101 Blog</h1><p>Payment guides and product updates are being prepared for this marketing demo.</p><a className="primary" href="mailto:support@pay101.uk?subject=Pay101%20Blog%20Enquiry">Contact our team <ArrowRight size={17}/></a></div></section></main></div>}
function MerchantSignup(){
 React.useEffect(()=>{document.title='Merchant Sign Up | Pay101'},[]);
 const [name,setName]=React.useState(''),[email,setEmail]=React.useState(''),[company,setCompany]=React.useState(''),[type,setType]=React.useState(''),[message,setMessage]=React.useState('');
 function submit(e){e.preventDefault();setMessage('This is a demo sign-up form. No account has been created and no information has been submitted. Contact the Pay101 team to request access.')}
 return <div className="merchantPage">
  <header className="merchantHeader"><a href="/" className="merchantBrand"><img src="/assets/pay101-logo.png" alt="Pay101"/></a><div className="merchantHeaderRight"><span>Already have an account?</span><a href="/login">Sign in <ArrowRight size={15}/></a></div></header>
  <main className="merchantLayout"><section className="merchantIntro"><div className="merchantEyebrow"><span/> MERCHANT PORTAL</div><h1>Start with Pay101.<br/><em>Grow with clarity.</em></h1><p>Request merchant access and explore payment collections, payouts and settlement visibility for your business.</p><div className="merchantBenefits"><span><ShieldCheck size={17}/> Payment visibility</span><span><LockKeyhole size={17}/> Merchant account access</span><span><BarChart3 size={17}/> Settlement overview</span></div></section>
  <section className="loginPanel"><div className="loginPanelHead"><div className="loginIcon"><Mail size={21}/></div><span className="loginTag">MERCHANT SIGN UP</span><h2>Request access</h2><p>Share your business details to get started.</p></div>
  <form className="loginForm" onSubmit={submit}><label htmlFor="signup-name">Full name</label><div className="loginInput"><input id="signup-name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" autoComplete="name" required/></div><label htmlFor="signup-email">Work email</label><div className="loginInput"><Mail size={17}/><input id="signup-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" required/></div><label htmlFor="signup-company">Business name</label><div className="loginInput"><input id="signup-company" value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name" required/></div><label htmlFor="signup-type">Business type</label><div className="loginInput"><input id="signup-type" value={type} onChange={e=>setType(e.target.value)} placeholder="e.g. E-commerce, Gaming, Media" required/></div><button className="loginSubmit" type="submit">Request merchant access <ArrowRight size={17}/></button>{message&&<p className="loginNotice" role="status">{message}</p>}</form><div className="loginHelp">Already registered? <a href="/login">Sign in to merchant portal</a></div><div className="loginSecurity"><LockKeyhole size={14}/> Demo only — account creation is not enabled.</div></section></main>
  <footer className="merchantFooter"><span>© 2026 Pay101. Merchant portal preview.</span><div><a href="/">Pay101 home</a><a href="mailto:support@pay101.uk">Help & support</a></div></footer>
 </div>
}
const isMerchantLogin=window.location.pathname==='/login'||window.location.hostname==='partner.pay101.uk';
if(window.location.pathname==='/how-it-works'){import('./how-it-works.jsx')}else{createRoot(document.getElementById('root')).render(window.location.pathname==='/signup'?<MerchantSignup/>:isMerchantLogin?<MerchantLogin/>:window.location.pathname==='/blog'?<MarketingBlog/>:segmentPages[window.location.pathname]?<SegmentLanding segment={segmentPages[window.location.pathname]}/>:<App/>);
}