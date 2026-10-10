import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import {ArrowRight, Check, Globe2, ShieldCheck, Zap, Menu, X, CreditCard, BarChart3, Code2, LockKeyhole, Landmark, Send, WalletCards, Eye, EyeOff, Mail} from 'lucide-react';
import {AreaChart, Area, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import './style.css';

const chart=[{m:'Jan',v:32},{m:'Feb',v:44},{m:'Mar',v:39},{m:'Apr',v:62},{m:'May',v:57},{m:'Jun',v:81},{m:'Jul',v:76},{m:'Aug',v:96}];
const tx=[['Payment received','Merchant checkout','+$2,840.00 USD','Success'],['Payment sent','Vendor transfer','-AED 1,280.00','Success'],['Money received','Bank account','+A$4,820.00 AUD','Settled']];
const heroSlides=[{eyebrow:'PAYMENTS MADE SIMPLE',line1:'Make payments.',line2:'Make progress.',copy:'Accept money from customers, send payments to partners, and see what is happening in one clear place.',cta:'Explore Pay101'},{eyebrow:'LESS TIME CHASING PAYMENTS',line1:'Know what’s paid.',line2:'Know what’s next.',copy:'See incoming payments, outgoing transfers and when money is expected to reach your account.',cta:'See how it works'},{eyebrow:'PAYMENTS FOR MORE MARKETS',line1:'One clear view.',line2:'More ways to pay.',copy:'Explore familiar payment options and bank transfers for businesses serving customers in different markets.',cta:'Explore markets'}];

function App(){
 const [menu,setMenu]=React.useState(false);
 const [solutionsOpen,setSolutionsOpen]=React.useState(false);
 const [solutionTab,setSolutionTab]=React.useState('markets');
 const [activeSlide,setActiveSlide]=React.useState(0);
 React.useEffect(()=>{const timer=setInterval(()=>setActiveSlide(i=>(i+1)%heroSlides.length),5000);return ()=>clearInterval(timer)},[]);
 const slide=heroSlides[activeSlide];
 return <div className="app">
  <nav className="nav">
   <a className="brand" href="#" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a>
   <div className="navLinks">
    <div className="navDropdownWrap" onMouseEnter={()=>setSolutionsOpen(true)} onMouseLeave={()=>setSolutionsOpen(false)}>
     <button className={`navDropTrigger ${solutionsOpen?'isOpen':''}`} onClick={()=>setSolutionsOpen(v=>!v)} aria-expanded={solutionsOpen}>Solutions <span>⌄</span></button>
     {solutionsOpen&&<div className="solutionsDropdown">
      <div className="solutionsTabs"><button className={solutionTab==='markets'?'selected':''} onClick={()=>setSolutionTab('markets')}>Local markets</button><button className={solutionTab==='industries'?'selected':''} onClick={()=>setSolutionTab('industries')}>Industries</button><button className={solutionTab==='features'?'selected':''} onClick={()=>setSolutionTab('features')}>Features</button></div>
      <div className="solutionsPanel">
       {solutionTab==='markets'&&<><span className="dropdownHeading">Explore markets</span><a href="#markets"><b>🇮🇳 India</b><small>UPI and bank transfers</small></a><a href="#markets"><b>🇳🇵 Nepal</b><small>Local payment options</small></a><a href="#markets"><b>🇧🇹 Bhutan</b><small>Regional payment options</small></a><a href="#markets"><b>🇦🇪 United Arab Emirates</b><small>Dirham currency examples</small></a><a href="#markets"><b>🇦🇺 Australia</b><small>Australian dollar examples</small></a></>}
       {solutionTab==='industries'&&<><span className="dropdownHeading">Who we help</span><a href="#solutions"><b>Online stores</b><small>Make checkout easier</small></a><a href="#solutions"><b>Marketplaces</b><small>Collect and send payments</small></a><a href="#solutions"><b>Digital services</b><small>Manage customer payments</small></a></>}
       {solutionTab==='features'&&<><span className="dropdownHeading">What you can do</span><a href="#solutions"><b>Accept payments</b><small>Give customers easy ways to pay</small></a><a href="#solutions"><b>Send payouts</b><small>Pay vendors and partners</small></a><a href="#solutions"><b>Track your money</b><small>See payments and transfers clearly</small></a></>}
      </div>
     </div>}
    </div>
    <a href="#markets">Markets</a><a href="#developers">How it works</a><a href="#security">Security</a>
   </div>
   <div className="navActions"><a className="ghost" href="/login">Sign in</a><button className="primary small">Get started <ArrowRight size={15}/></button></div>
   <button className="mobileBtn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
  </nav>
  {menu&&<div className="mobileMenu"><a href="#solutions">Solutions</a><a href="#markets">Markets</a><a href="#developers">How it works</a><a href="#security">Security</a><button className="primary">Get started</button></div>}

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
    <Dashboard/>
   </section>

   <section id="markets" className="marketsSection">
    <div className="marketsIntro"><span className="kicker">EXPLORE MARKETS</span><h2>Payments that feel <em>local.</em></h2><p>Customers like to pay in familiar ways. Explore the markets we are considering and ask our team which options are available for your business.</p></div>
    <div className="marketGrid">
     <a href="mailto:support@pay101.uk?subject=Pay101%20India%20market"><span className="marketFlag">🇮🇳</span><div><b>India</b><small>UPI and bank transfers</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Nepal%20market"><span className="marketFlag">🇳🇵</span><div><b>Nepal</b><small>Explore local payment options</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Bhutan%20market"><span className="marketFlag">🇧🇹</span><div><b>Bhutan</b><small>Explore local payment options</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20UAE%20market"><span className="marketFlag">🇦🇪</span><div><b>United Arab Emirates</b><small>AED currency examples</small></div><ArrowRight size={17}/></a>
     <a href="mailto:support@pay101.uk?subject=Pay101%20Australia%20market"><span className="marketFlag">🇦🇺</span><div><b>Australia</b><small>AUD currency examples</small></div><ArrowRight size={17}/></a>
    </div>
    <p className="marketDisclaimer">Market examples are for demonstration. Payment methods and country availability must be confirmed with Pay101.</p>
   </section>

   <section id="rails" className="rails">
    <div><span>PAYMENT RAILS</span><strong>Built around the ways businesses move money.</strong></div>
    <div className="railList">
     <div><WalletCards size={20}/><b>UPI</b><small>Digital payments</small></div>
     <div><Send size={20}/><b>IMPS</b><small>Fast transfers</small></div>
     <div><Landmark size={20}/><b>NEFT</b><small>Bank transfers</small></div>
     <div><Landmark size={20}/><b>RTGS</b><small>High-value transfers</small></div>
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
     <div className="miniCard"><div className="miniTop"><span>PAY101 PAYMENT HUB</span><span className="liveDot">● LIVE</span></div><strong>$248,920.42</strong><div className="miniChange">Illustrative multi-currency activity <small>demo view</small></div><div className="currencyChips"><span><b>Nu.</b> BTN</span><span><b>रू</b> NPR</span><span><b>د.إ</b> AED</span><span><b>A$</b> AUD</span><span><b>$</b> USD</span></div><div className="miniBars">{[30,52,42,67,54,80,63,91,76,100].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div>
     <div className="floatTag tag1"><Check size={15}/> Settlement initiated</div><div className="floatTag tag2">UPI · Bank transfers</div>
    </div>
    <div className="splitCopy"><span className="kicker">ONE CONNECTED WORKFLOW</span><h2>From payment to <em>settlement.</em></h2><p>Keep your payment operations visible from collection through payout and settlement.</p><ul><li><Check/> Real-time transaction visibility</li><li><Check/> Payin and payout workflows</li><li><Check/> Settlement status tracking</li><li><Check/> Clear reporting for operations</li></ul><button className="textBtn">Explore Pay101 solutions <ArrowRight size={17}/></button></div>
   </section>

   <section id="developers" className="devSection">
    <div className="devCopy"><span className="kicker">FOR DEVELOPERS</span><h2>Payment infrastructure that is <em>easy to integrate.</em></h2><p>Build payment experiences with straightforward technical connections, clear integration patterns and transaction visibility.</p><div className="codeTabs"><span>Node.js</span><span>Python</span><span>cURL</span></div><div className="code"><div className="dots"><i/><i/><i/></div><pre><code><span>const</span> payment = <span>await</span> pay101.payments.create({'{'}
  amount: <b>4999</b>,
  currency: <b>'INR'</b>,
  method: <b>'UPI'</b>
{'}'});</code></pre></div></div>
    <div className="apiCard"><Code2 size={24}/><span>TRANSACTION</span><strong>payment.succeeded</strong><div className="apiRow"><span>reference</span><b>PAY_101_8F21</b></div><div className="apiRow"><span>method</span><b>UPI</b></div><div className="apiRow"><span>status</span><b className="green">● succeeded</b></div></div>
   </section>

   <section id="security" className="security"><div><span className="kicker">TRUST BY DESIGN</span><h2>Built with <em>security</em> in mind.</h2><p>Keep payment operations protected with access controls, transaction visibility and security-focused infrastructure.</p></div><div className="securityGrid"><Feature icon={<LockKeyhole/>} title="Secure access" text="Role-aware access and controlled payment operations."/><Feature icon={<ShieldCheck/>} title="Protected flows" text="Security-focused controls across payment workflows."/><Feature icon={<BarChart3/>} title="Full visibility" text="Track transactions, payouts and settlement activity in one place."/></div></section>

   <section className="cta"><div className="ctaGlow"/><span className="kicker">READY TO MOVE MONEY?</span><h2>Build your payment flow<br/>with <em>Pay101.</em></h2><p>Bring payins, payouts and settlement operations together in one modern platform.</p><button className="primary">Get started with Pay101 <ArrowRight size={17}/></button></section>
  </main>

  <footer><a className="brand" href="#" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a><span>© 2026 Pay101. Demo concept.</span><div><a>Privacy</a><a>Terms</a><a>Contact</a></div></footer>
 </div>
}

function Feature({icon,title,text}){return <motion.div className="feature" whileHover={{y:-5}}><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p><ArrowRight className="featureArrow" size={17}/></motion.div>}

const currencySlides=[
 {code:'BTN',name:'Bhutanese Ngultrum',symbol:'Nu.',amount:'Nu. 184,290',volume:'Nu. 2,840',region:'BHUTAN',tx:[['Payment received','Merchant checkout','+Nu. 2,840','Success'],['Payment sent','Vendor transfer','-Nu. 1,280','Success'],['Money received','Bank account','+Nu. 4,820','Settled']]},
 {code:'NPR',name:'Nepalese Rupee',symbol:'रू',amount:'रू 18,42,900',volume:'रू 28,400',region:'NEPAL',tx:[['Payment received','Merchant checkout','+रू 28,400','Success'],['Payment sent','Vendor transfer','-रू 12,800','Success'],['Money received','Bank account','+रू 48,200','Settled']]},
 {code:'AED',name:'UAE Dirham',symbol:'د.إ',amount:'د.إ 184,290',volume:'د.إ 2,840',region:'UNITED ARAB EMIRATES',tx:[['Payment received','Merchant checkout','+د.إ 2,840','Success'],['Payment sent','Vendor transfer','-د.إ 1,280','Success'],['Money received','Bank account','+د.إ 4,820','Settled']]},
 {code:'AUD',name:'Australian Dollar',symbol:'A


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
,amount:'A$ 184,290',volume:'A$ 2,840',region:'AUSTRALIA',tx:[['Payment received','Merchant checkout','+A$ 2,840','Success'],['Payment sent','Vendor transfer','-A$ 1,280','Success'],['Money received','Bank account','+A$ 4,820','Settled']]},
 {code:'USD',name:'US Dollar',symbol:'


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
,amount:'$ 184,290',volume:'$ 2,840',region:'GLOBAL EXAMPLE',tx:[['Payment received','Merchant checkout','+$2,840.00','Success'],['Payment sent','Vendor transfer','-$1,280.00','Success'],['Money received','Bank account','+$4,820.00','Settled']]},
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
