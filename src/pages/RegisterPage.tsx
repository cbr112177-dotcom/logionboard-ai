import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShieldCheck } from "lucide-react"
export default function RegisterPage(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const nav=useNavigate()
  const reg=(e:any)=>{e.preventDefault(); sessionStorage.setItem("logionboard_user",email); nav("/dashboard")}
  return(
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] to-[#0F2440] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"><div className="flex items-center gap-2 mb-8"><ShieldCheck className="h-6 w-6 text-[#F59E0B]"/><span className="font-bold text-xl text-[#1E3A5F]">LogiOnboard AI</span></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
        <form onSubmit={reg} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label><input type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F]" placeholder="Your Trucking Co." required/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F]" placeholder="you@company.com" required/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F]" placeholder="********" required/></div>
          <button type="submit" className="w-full bg-[#1E3A5F] text-white py-2.5 rounded-lg font-semibold hover:bg-[#2A5090] transition">Create Account</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="text-[#1E3A5F] font-semibold hover:underline">Sign in</Link></p>
      </div></div>
)
}
