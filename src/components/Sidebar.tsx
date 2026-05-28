import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, FileText, GraduationCap, ShieldCheck, Bot, CalendarCheck, BarChart3, Settings, CreditCard, Menu, X, Truck } from "lucide-react"
import { useState } from "react"
const items = [
  {path:"/dashboard",label:"Dashboard",icon:LayoutDashboard},
  {path:"/employees",label:"Employees",icon:Users},
  {path:"/documents",label:"Documents",icon:FileText},
  {path:"/training",label:"Training",icon:GraduationCap},
  {path:"/compliance",label:"Compliance",icon:ShieldCheck},
  {path:"/chat",label:"AI Chat",icon:Bot},
  {path:"/checkins",label:"Check-Ins",icon:CalendarCheck},
  {path:"/analytics",label:"Analytics",icon:BarChart3},
  {path:"/settings",label:"Settings",icon:Settings},
  {path:"/billing",label:"Billing",icon:CreditCard},
]
export default function Sidebar(){
  const loc=useLocation(); const [open,setOpen]=useState(false)
  const nav=(
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-2 border-b border-white/10"><Truck className="h-6 w-6 text-[#F59E0B]"/><span className="font-bold text-white text-lg">LogiOnboard</span></div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(i=>{
          const a=loc.pathname.startsWith(i.path);
          return <Link key={i.path} to={i.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${a?"bg-[#F59E0B] text-[#1E3A5F]":"text-white/70 hover:text-white hover:bg-white/10"}`}><i.icon className="h-5 w-5"/>{i.label}</Link>
        })}
      </nav>
      <div className="p-4 border-t border-white/10"><p className="text-xs text-white/40">LogiOnboard AI v1.0</p></div>
    </div>
  )
  return <><button onClick={()=>setOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1E3A5F] rounded-lg"><Menu className="h-5 w-5 text-white"/></button><aside className="hidden lg:flex w-64 bg-[#1E3A5F] flex-col shrink-0">{nav}</aside></>
}
