import { cn } from "../lib/utils"
export default function StatCard({icon:Icon,label,value,trend,trendUp,color}:{icon:React.ElementType;label:string;value:string|number;trend?:string;trendUp?:boolean;color?:string}){
  return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between mb-4"><div className={cn("p-3 rounded-lg",color||"bg-blue-50")}><Icon className={cn("h-6 w-6",color?"text-white":"text-[#1E3A5F]")}/></div>{trend&&<span className={cn("text-sm font-medium",trendUp?"text-green-600":"text-red-500")}>{trend}</span>}</div><p className="text-2xl font-bold text-gray-900">{value}</p><p className="text-sm text-gray-500 mt-1">{label}</p></div>
}
