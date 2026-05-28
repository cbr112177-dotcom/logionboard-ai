import { Link } from "react-router-dom"
import { ShieldCheck, Truck, ArrowRight, CheckCircle2 } from "lucide-react"
const pricing=[{n:"Starter",p:49,e:5,f:["Up to 5 employees","Document collection","Basic compliance","Email support"]},{n:"Growth",p:79,e:20,f:["Up to 20 employees","Everything in Starter","AI compliance","Training modules","Priority support"]},{n:"Scale",p:99,e:50,f:["Up to 50 employees","Everything in Growth","AI chat","Analytics","Custom templates"]}]
export default function LandingPage(){return(
  <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] to-[#0F2440]">
    <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center gap-2"><ShieldCheck className="h-8 w-8 text-[#F59E0B]"/><span className="text-white font-bold text-xl">LogiOnboard AI</span></div>
      <div className="flex items-center gap-4"><Link to="/login" className="text-white/80 hover:text-white">Login</Link><Link to="/register" className="bg-[#F59E0B] text-[#1E3A5F] px-5 py-2 rounded-lg font-semibold hover:bg-[#FBBF24] transition">Get Started</Link></div>
    </nav>
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">Driver & Employee <span className="text-[#F59E0B]">Onboarding, Automated</span></h1>
      <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">LogiOnboard AI automates compliance checks, document collection, training, and check-ins for small trucking and logistics companies. No expensive HR software needed.</p>
      <Link to="/register" className="inline-block bg-[#F59E0B] text-[#1E3A5F] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#FBBF24] transition shadow-lg mb-16">Start Onboarding Today <ArrowRight className="inline h-5 w-5 ml-2"/></Link>
      <div className="bg-white/5 backdrop-blur rounded-2xl p-8 max-w-4xl mx-auto border border-white/10"><p className="text-white/60 text-sm mb-2">TRUSTED BY FLEET OWNERS IN ARKANSAS & TEXAS</p><p className="text-white text-lg italic">"LogiOnboard AI helped us cut driver turnover by 15% and cut onboarding time from 3 days to 2 hours."</p><p className="text-[#F59E0B] mt-3 font-semibold">— Christopher Branch, CABRANCH Enterprise LLC (SHRM-SCP)</p></div>
    </section>
    <section className="max-w-7xl mx-auto px-6 py-20"><h2 className="text-3xl font-bold text-white text-center mb-12">Simple Pricing</h2><div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">{pricing.map(t=><div key={t.n} className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10"><h3 className="text-white font-bold text-2xl mb-2">{t.n}</h3><p className="text-4xl font-extrabold text-white mb-1">${t.p}<span className="text-lg text-white/50 font-normal">/mo</span></p><p className="text-white/50 mb-6">Up to {t.e} employees</p><ul className="space-y-3 mb-8">{t.f.map(f=><li key={f} className="flex items-start gap-2 text-white/80"><CheckCircle2 className="h-5 w-5 text-[#F59E0B] shrink-0"/>{f}</li>)}</ul><Link to="/register" className="block w-full text-center bg-[#F59E0B] text-[#1E3A5F] px-6 py-3 rounded-lg font-bold hover:bg-[#FBBF24] transition">Choose {t.n}</Link></div>)}</div></section>
    <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm"><p>&copy; 2024 LogiOnboard AI — A CABRANCH Enterprise LLC Product</p></footer>
  </div>
)
}
