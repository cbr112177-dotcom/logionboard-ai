import { FMCSA_COMPLIANCE_ITEMS } from "../lib/constants"
import { CheckCircle2, AlertCircle } from "lucide-react"
export default function ComplianceChecklist({completed}:{completed:string[]}){
  return <div className="space-y-2">{FMCSA_COMPLIANCE_ITEMS.map(i=>{const d=completed.includes(i);return(<div key={i} className="flex items-center gap-2 text-sm">{d?<CheckCircle2 className="h-4 w-4 text-green-600"/>:<AlertCircle className="h-4 w-4 text-amber-500"/>}<span className={d?"text-gray-700":"text-gray-500"}>{i}</span></div>)})}</div>
}
