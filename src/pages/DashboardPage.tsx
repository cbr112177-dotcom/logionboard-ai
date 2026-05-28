import { Users, FileCheck, AlertTriangle, TrendingDown, Plus, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import StatCard from "../components/StatCard"
export default function DashboardPage(){
  return(
    <div>
      <div className="flex items-center justify-between mb-8"><h1 className="text-2xl font-bold text-gray-900">Dashboard</h1><Link to="/employees/new" className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#2A5090]"><Plus className="h-4 w-4"/>Add Employee</Link></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} label="Active Employees" value="12" trend="+2" trendUp={true}/>
        <StatCard icon={FileCheck} label="Onboarding Completion" value="78%" trend="+5%" trendUp={true}/>
        <StatCard icon={AlertTriangle} label="Compliance Flags" value="3" trend="-2" trendUp={true}/>
        <StatCard icon={TrendingDown} label="Turnover Risk" value="Low" color="bg-green-50"/>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2><div className="space-y-3">{["Mike Jones completed onboarding","Sarah Smith uploaded I-9","David Brown started training"].map((a,i)=><div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"><div className="w-2 h-2 rounded-full bg-[#F59E0B]"/><p className="text-sm text-gray-600">{a}</p></div>)}</div></div>
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2><div className="flex flex-wrap gap-3"><Link to="/employees/new" className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg text-sm hover:bg-[#2A5090]"><UserPlus className="h-4 w-4"/>Onboard New Driver</Link><Link to="/compliance" className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-[#1E3A5F] rounded-lg text-sm font-semibold hover:bg-[#FBBF24]"><FileCheck className="h-4 w-4"/>Review Compliance</Link><Link to="/training" className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"><Users className="h-4 w-4"/>Assign Training</Link></div></div>
    </div>
)
}
