import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import {ArrowRight, Check, Globe2, ShieldCheck, Zap, Sparkles, Menu, X, CreditCard, BarChart3, Code2, LockKeyhole, Landmark, Send, WalletCards, Eye, EyeOff, Mail} from 'lucide-react';
import {AreaChart, Area, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import './style.css';
import Pay101Bot from './Pay101Bot.jsx';

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
 React.useEffect(()=>{const timer=setInterval(()=>setActiveSlide(i=>(i+1)%heroSlides.length),5000);return ()=>clearInterval(timer)},[]);
 const slide=heroSlides[activeSlide];
 return <div className="app">
  <header className="p101Header">
   <div className="p101HeaderInner">
    <a className="brand" href="/" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a>
    <nav className={`p101Nav ${menu?'mobileOpen':''}`} aria-label="Main navigation">
     <div className="p101NavItem">
      <button className="p101NavLink" onClick={()=>setSolutionsOpen(v=>!v)} onMouseEnter={()=>setSolutionsOpen(true)} aria-expanded={solutionsOpen}>Solutions <span>⌄</span></button>
      {solutionsOpen&&<div className="p101Mega" onMouseLeave={()=>setSolutionsOpen(false)}>
       <div className="p101MegaTabs">{[['collect','Collect','Accept customer payments'],['payout','Pay out','Move money to partners'],['settle','Settle','Know when funds arrive']].map(([key,label,sub])=><button key={key} className={solutionTab===key?'active':''} onMouseEnter={()=>setSolutionTab(key)} onClick={()=>setSolutionTab(key)}>{label}<small>{sub}</small></button>)}</div>
       <div className="p101MegaPanel">{(solutionTab==='collect'?[['Payin Solutions','Accept customer payments online','#solutions'],['UPI Payments','Fast, familiar digital payments','#solutions']]:solutionTab==='payout'?[['Payout Solutions','Pay vendors, partners and customers','#solutions'],['IMPS Transfers','Quick bank-to-bank transfers','#solutions'],['NEFT & RTGS','Bank transfer workflows','#solutions']]:[['Instant Settlements','See when funds are available','#solutions']]).map(([title,description,url])=><a key={title} href={url} onClick={()=>{setSolutionsOpen(false);setMenu(false)}}><span className="p101MegaIcon"><ArrowRight size={18}/></span><span><strong>{title}</strong><small>{description}</small></span></a>)}</div>
      </div>}
     </div>
     <div className="p101NavItem p101HoverDrop"><button className="p101NavLink">Industries <span>⌄</span></button><div className="p101Drop">{[['E-commerce','Online stores and marketplaces'],['Gaming','Top-ups and withdrawals'],['Media & Entertainment','Subscriptions and streaming'],['Travel','Bookings and payouts'],['Education','Fees and instalments']].map(([name,desc])=><a key={name} href="#solutions" onClick={()=>setMenu(false)}><strong>{name}</strong><small>{desc}</small></a>)}</div></div>
     <div className="p101NavItem p101HoverDrop"><button className="p101NavLink">Markets <span>⌄</span></button><div className="p101Drop p101MarketsDrop">{[['India','in','UPI and bank transfers'],['Nepal','np','Local payment options'],['Bhutan','bt','Regional payment options'],['Brazil','br','Pix payment examples'],['Australia','au','AUD payment examples']].map(([name,iso,desc])=><a key={name} href="#markets" onClick={()=>setMenu(false)}><img src={`https://flagcdn.com/w40/${iso}.png`} alt="" loading="lazy"/><span><strong>{name}</strong><small>{desc}</small></span></a>)}<small className="p101DropNote">Markets shown for demonstration. Confirm availability with Pay101.</small></div></div>
     <a className="p101NavLink" href="#rails" onClick={()=>setMenu(false)}>How it works</a>
     <div className="p101NavItem p101HoverDrop"><button className="p101NavLink">Company <span>⌄</span></button><div className="p101Drop p101CompanyDrop"><a href="#about"><strong>About us</strong><small>Who we are and what we build</small></a><a href="#security"><strong>Security</strong><small>Security-focused payment operations</small></a><a href="#contact"><strong>Talk to our team</strong><small>Find payment options for your business</small></a></div></div>
    </nav>
    <div className="p101Actions"><a className="p101Signin" href="/login">Sign in</a><div className="p101Social" aria-label="Social media"><span title="LinkedIn">in</span><span title="X">𝕏</span><span title="Instagram">◎</span><span title="YouTube">▶</span></div><a className="primary small" href="#contact">Get started <ArrowRight size={15}/></a></div>
    <button className="p101Burger" type="button" onClick={()=>setMenu(v=>!v)} aria-label="Toggle navigation" aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
   </div>
  </header>
  <main>
   <section className="hero">
    <div className="orb orb1"/><div className="orb orb2"/>
    <div className="heroCopy">
     <div className="eyebrow"><span className="pulse"/> {slide.eyebrow}</div>
     <h1 key={activeSlide} className="heroHeadline">{slide.line1}<br/><em>{slide.line2}</em></h1>
     <p key={`copy-${activeSlide}`} className="heroDescription">{slide.copy}</p>
     <div className="heroCtas"><a className="primary" href="#solutions">{slide.cta} <ArrowRight size={17}/></a><a className="play" href="#rails"><span>→</span> Explore solutions</a></div>
     <div className="heroSlider" aria-label="Choose hero slide">{heroSlides.map((item,i)=><button key={item.eyebrow} className={`heroDot ${i===activeSlide?'active':''}`} onClick={()=>setActiveSlide(i)} aria-label={`Show slide ${i+1}`} aria-pressed={i===activeSlide}/>)}</div>
     <div className="trust"><div className="avatars"><i/><i/><i/><i/></div><span><b>One platform</b> for your payment operations</span></div>
    </div>
    <PaymentGlobe/>
   </section>
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

   <section id="security" className="security"><div><span className="kicker">TRUST BY DESIGN</span><h2>Built with <em>security</em> in mind.</h2><p>Keep payment operations protected with access controls, transaction visibility and security-focused infrastructure.</p></div><div className="securityGrid"><Feature icon={<LockKeyhole/>} title="Secure access" text="Role-aware access and controlled payment operations."/><Feature icon={<ShieldCheck/>} title="Protected flows" text="Security-focused controls across payment workflows."/><Feature icon={<BarChart3/>} title="Full visibility" text="Track transactions, payouts and settlement activity in one place."/></div></section>

   <section id="about" className="aboutContactSection"><div className="aboutContactLabel">ABOUT PAY101</div><div className="aboutContactGrid"><div><h2>Payments made simpler for growing businesses.</h2></div><div><p>Pay101 brings the ideas of payins, payouts, settlement workflows and payment visibility into one connected experience. Explore payment options across markets and discover how a streamlined platform could support your business.</p><small>This website is a demonstration concept. Payment methods and integrations shown are illustrative and subject to confirmation.</small></div></div></section>
   <section id="contact" className="contactSection"><div><span className="aboutContactLabel">CONTACT OUR TEAM</span><h2>Let's talk payments.</h2><p>Have questions about Pay101 or want to discuss payment solutions for your business? Get in touch with our team.</p></div><a className="primary" href="mailto:support@pay101.uk?subject=Pay101%20Business%20Enquiry">Email support@pay101.uk <ArrowRight size={17}/></a></section>

   <section className="cta"><div className="ctaGlow"/><span className="kicker">READY TO MOVE MONEY?</span><h2>Build your payment flow<br/>with <em>Pay101.</em></h2><p>Bring payins, payouts and settlement operations together in one modern platform.</p><a className="primary" href="#contact">Get started with Pay101 <ArrowRight size={17}/></a></section>
  </main>
  <Pay101Bot/>

  <section id="faqs" className="p101FaqSection"><div className="p101FaqInner"><span className="kicker">COMMON QUESTIONS</span><h2>Frequently asked <em>questions.</em></h2><details><summary>What is Pay101?</summary><p>Pay101 presents payment collection, payouts and settlement workflows in one connected experience. This website is a demo concept.</p></details><details><summary>Which payment methods are shown?</summary><p>The demo showcases methods such as UPI, Pix, PayID, cards and regional wallet or bank transfer options. Contact our team to confirm availability.</p></details><details><summary>How can I get started?</summary><p>Use the contact section to discuss your business needs and available payment options with the Pay101 team.</p></details></div></section>
   <footer className="p101Footer">
    <div className="p101FooterGrid">
     <div className="p101FooterBrand"><a className="brand" href="/" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a><h3>Payments, simplified.</h3><p>Making payment experiences easier to navigate, one step at a time.</p></div>
     <div className="p101FooterCol"><h4>Explore</h4><a href="/">Home</a><a href="#solutions">Features</a><a href="#rails">How It Works</a><a href="#faqs">FAQs</a></div>
     <div className="p101FooterCol"><h4>Legal</h4><a href="mailto:support@pay101.uk?subject=Privacy%20Policy%20Request">Privacy Policy</a><a href="mailto:support@pay101.uk?subject=Terms%20and%20Conditions%20Request">Terms &amp; Conditions</a></div>
     <div className="p101FooterCol"><h4>Support</h4><a href="#contact">Contact Us</a><a href="mailto:support@pay101.uk?subject=Help%20and%20Support">Help &amp; Support</a></div>
    </div>
    <div className="p101FooterBottom"><span>© 2026 Pay101. All rights reserved.</span></div>
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
 const [selected,setSelected]=React.useState(1);
 React.useEffect(()=>{const id=setInterval(()=>setSelected(v=>(v+1)%globeMethods.length),3200);return()=>clearInterval(id)},[]);
 return <div className="globeStage" aria-label="Illustrative global payment methods">
  <div className="globeHalo"/>
  <div className="globeOrbit orbitOuter"/><div className="globeOrbit orbitInner"/>
  <div className="globeSphere"><div className="globeLatitude latOne"/><div className="globeLatitude latTwo"/><div className="globeLatitude latThree"/><div className="globeMeridian merOne"/><div className="globeMeridian merTwo"/><div className="globeMeridian merThree"/><div className="globeLand landAmericas"/><div className="globeLand landEurope"/><div className="globeLand landAsia"/><div className="globeLand landAfrica"/><div className="globeLand landAustralia"/><div className="globeSheen"/></div>
  {globeMethods.map((item,i)=><button key={item.country} type="button" onClick={()=>setSelected(i)} className={`globePin ${item.pos} ${selected===i?'isSelected':''}`} aria-label={`${item.country}: ${item.method}`}><span className={`globeMethodLogo logo${item.logo}`} aria-hidden="true">{item.logoUrl?<img className="globeBrandImage" src={item.logoUrl} alt="" loading="lazy" referrerPolicy="no-referrer"/>:item.logo==='Cards'?<CreditCard size={22}/>:item.logo==='Bank'?<Landmark size={22}/>:<strong>{item.method}</strong>}</span><img className="globeCountryFlag" src={`https://flagcdn.com/w40/${item.iso}.png`} alt={`${item.country} flag`} loading="lazy"/></button>)}
  <div className="globeCenterLabel"><Globe2 size={16}/><span>PAYMENTS WITHOUT BORDERS</span></div>
  <div className="globeFootnote">Concept illustration · Payment method availability subject to confirmation</div>
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
 <div className="recent"><span>RECENT ACTIVITY · {current.code}</span>{current.tx.map((t,i)=><div className="tx" key={i}><div className="txIcon">{i===1?'↗':current.symbol}</div><div><b>{t[0]}</b><small>{t[1]}</small></div><strong className={i===1?'minus':''}>{t[2]}</strong><i>{t[3]}</i></div>)}</div>
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
  <header className="merchantHeader"><a href="/" className="merchantBrand"><img src="/assets/pay101-logo.png" alt="Pay101"/></a><div className="merchantHeaderRight"><span>New to Pay101?</span><a href="mailto:support@pay101.uk?subject=Merchant%20account%20access">Contact our team <ArrowRight size={15}/></a></div></header>
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
    <div className="loginHelp">Need access to your merchant account? <a href="mailto:support@pay101.uk?subject=Merchant%20portal%20access">Contact support</a></div>
    <div className="loginSecurity"><LockKeyhole size={14}/> Never share your password or one-time codes.</div>
   </section>
  </main>
  <footer className="merchantFooter"><span>© 2026 Pay101. Merchant portal preview.</span><div><a href="/">Pay101 home</a><a href="mailto:support@pay101.uk">Help & support</a></div></footer>
 </div>
}

const isMerchantLogin=window.location.pathname==='/login'||window.location.hostname==='partner.pay101.uk';
createRoot(document.getElementById('root')).render(isMerchantLogin?<MerchantLogin/>:<App/>);
