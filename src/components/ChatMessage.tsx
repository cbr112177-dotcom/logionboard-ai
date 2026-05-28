import { cn } from "../lib/utils"
import { Bot, User } from "lucide-react"
export default function ChatMessage({role,content}:{role:"user"|"assistant";content:string}){
  return <div className={cn("flex gap-3 mb-4",role==="user"?"justify-end":"justify-start")}>{role==="assistant"&&<div className="w-8 h-8 rounded-full bg-[#1E3A5F] flex items-center justify-center"><Bot className="h-4 w-4 text-white"/></div>}<div className={cn("max-w-[75%] rounded-xl px-4 py-2.5 text-sm",role==="user"?"bg-[#1E3A5F] text-white":"bg-gray-100 text-gray-800")}>{content}</div>{role==="user"&&<div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center"><User className="h-4 w-4 text-white"/></div>}</div>
}
