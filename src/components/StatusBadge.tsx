import { cn } from "../lib/utils"
export default function StatusBadge({status}:{status:string}){
  const c:Record<string,string>={pending:"bg-yellow-100 text-yellow-800",uploaded:"bg-blue-100 text-blue-800",verified:"bg-green-100 text-green-800",flagged:"bg-red-100 text-red-800",active:"bg-green-100 text-green-800",onboarding:"bg-blue-100 text-blue-800",terminated:"bg-gray-100 text-gray-600",completed:"bg-green-100 text-green-800"}
  return <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium",c[status]||"bg-gray-100 text-gray-600")}>{status.charAt(0).toUpperCase()+status.slice(1)}</span>
}
