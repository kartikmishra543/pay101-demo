import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import {ArrowRight, Check, Globe2, ShieldCheck, Zap, Menu, X, CreditCard, BarChart3, Code2, LockKeyhole, Landmark, Send, WalletCards} from 'lucide-react';
import {AreaChart, Area, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import './style.css';

const chart=[{m:'Jan',v:32},{m:'Feb',v:44},{m:'Mar',v:39},{m:'Apr',v:62},{m:'May',v:57},{m:'Jun',v:81},{m:'Jul',v:76},{m:'Aug',v:96}];
const tx=[['Payin received','Merchant checkout','+₹2,840.00','Success'],['Payout processed','Vendor transfer','-₹1,280.00','Success'],['Settlement','Bank account','+₹4,820.00','Settled']];

function App(){
 const [menu,setMenu]=React.useState(false);
 return <div className="app">
  <nav className="nav">
   <a className="brand" href="#" aria-label="Pay101 home"><img src="/assets/pay101-logo.png" alt="Pay101" className="brandLogo"/></a>
   <div className="navLinks"><a href="#solutions">Solutions</a><a href="#rails">Payment Rails</a><a href="#developers">Developers</a><a href="#security">Security</a></div>
   <div className="navActions"><button className="ghost">Sign in</button><button className="primary small">Get started <ArrowRight size={15}/></button></div>
   <button className="mobileBtn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
  </nav>
  {menu&&<div className="mobileMenu"><a href="#solutions">Solutions</a><a href="#rails">Payment Rails</a><a href="#developers">Developers</a><a href="#security">Security</a><button className="primary">Get started</button></div>}

  <main>
   <section className="hero">
    <div className="orb orb1"/><div className="orb orb2"/>
    <div className="heroCopy">
     <div className="eyebrow"><span className="pulse"/> PAYMENT INFRASTRUCTURE FOR BUSINESS</div>
     <h1>Move money.<br/><em>Move business.</em></h1>
     <p>Accept payments, manage payouts and access streamlined settlement flows through one modern payment platform.</p>
     <div className="heroCtas"><button className="primary">Start with Pay101 <ArrowRight size={17}/></button><button className="play"><span>→</span> Explore solutions</button></div>
     <div className="trust"><div className="avatars"><i/><i/><i/><i/></div><span><b>One platform</b> for your payment operations</span></div>
    </div>
    <Dashboard/>
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
     <div className="miniCard"><div className="miniTop"><span>PAY101 PAYMENT HUB</span><span className="liveDot">● LIVE</span></div><strong>₹248,920.42</strong><div className="miniChange">Settlement activity <small>this month</small></div><div className="miniBars">{[30,52,42,67,54,80,63,91,76,100].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div>
     <div className="floatTag tag1"><Check size={15}/> Settlement initiated</div><div className="floatTag tag2">UPI · IMPS · NEFT · RTGS</div>
    </div>
    <div className="splitCopy"><span className="kicker">ONE CONNECTED WORKFLOW</span><h2>From payment to <em>settlement.</em></h2><p>Keep your payment operations visible from collection through payout and settlement.</p><ul><li><Check/> Real-time transaction visibility</li><li><Check/> Payin and payout workflows</li><li><Check/> Settlement status tracking</li><li><Check/> Clear reporting for operations</li></ul><button className="textBtn">Explore Pay101 solutions <ArrowRight size={17}/></button></div>
   </section>

   <section id="developers" className="devSection">
    <div className="devCopy"><span className="kicker">FOR DEVELOPERS</span><h2>Payment infrastructure that is <em>easy to integrate.</em></h2><p>Build payment experiences with straightforward APIs, clear integration patterns and transaction visibility.</p><div className="codeTabs"><span>Node.js</span><span>Python</span><span>cURL</span></div><div className="code"><div className="dots"><i/><i/><i/></div><pre><code><span>const</span> payment = <span>await</span> pay101.payments.create({'{'}
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

function Dashboard(){return <motion.div className="dashboard" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
 <div className="dashGlow"/>
 <div className="dashHead"><div><small>PAYMENT OVERVIEW</small><h3>Pay101 dashboard</h3></div><div className="user">P</div></div>
 <div className="stats"><div><span>Processed volume</span><strong>₹184,290</strong><b>↑ 24.8%</b></div><div><span>Success rate</span><strong>98.7%</strong><b>↑ 1.2%</b></div></div>
 <div className="chartBox"><div className="chartTitle"><span>Payment activity</span><small>Last 8 months⌄</small></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#18b981" stopOpacity=".28"/><stop offset="100%" stopColor="#18b981" stopOpacity="0"/></linearGradient></defs><XAxis dataKey="m" hide/><Tooltip contentStyle={{background:'#fff',border:'1px solid #dce6ea',borderRadius:10,color:'#10202b'}}/><Area type="monotone" dataKey="v" stroke="#18b981" strokeWidth={3} fill="url(#fill)"/></AreaChart></ResponsiveContainer></div></div>
 <div className="recent"><span>RECENT ACTIVITY</span>{tx.map((t,i)=><div className="tx" key={i}><div className="txIcon">{i===1?'↗':'₹'}</div><div><b>{t[0]}</b><small>{t[1]}</small></div><strong className={i===1?'minus':''}>{t[2]}</strong><i>{t[3]}</i></div>)}</div>
 </motion.div>}

createRoot(document.getElementById('root')).render(<App/>);
