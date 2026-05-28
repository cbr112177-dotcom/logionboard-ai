import { useState, useRef, useEffect } from "react"
import ChatMessage from "../components/ChatMessage"
import { Send, Bot } from "lucide-react"

const initialMessages: {role:"user"|"assistant";content:string}[] = [
  {role:"assistant",content:"Hello! I'm LogiOnboard AI Assistant. I can help with onboarding, compliance, training, and policies."}
]
const responses: Record<string,string> = {
  "i-9":"I-9 forms must be completed within 3 business days of hire.",
  "cdl":"A valid CDL is required for drivers operating vehicles over 26,000 lbs.",
  "dot":"DOT physicals are valid for up to 24 months.",
  "training":"Training covers Safety, Operations, and Company Policy.",
  "drug":"DOT drug testing includes pre-employment and random testing."
}
export default function AIChatPage(){
  const [messages,setMessages] = useState(initialMessages)
  const [input,setInput] = useState("")
  const bottom = useRef<HTMLDivElement>(null)
  useEffect(()=>{bottom.current?.scrollIntoView({behavior:"smooth"})},[messages])
  const send = () => {
    if(!input.trim()) return
    const q = input.toLowerCase()
    let reply = "I can help with: I-9, CDL, DOT physicals, training, and drug testing."
    Object.keys(responses).forEach(k => { if(q.includes(k)) reply = responses[k] })
    setMessages(prev => [...prev, {role:"user",content:input}, {role:"assistant",content:reply}])
    setInput("")
  }
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-2 mb-4"><Bot className="h-6 w-6 text-[#F59E0B]"/><h1 className="text-xl font-bold">AI Assistant</h1></div>
      <div className="flex-1 overflow-y-auto bg-white rounded-xl p-6 shadow-sm border mb-4">
        {messages.map((m,i) => <ChatMessage key={i} role={m.role} content={m.content}/>)}
        <div ref={bottom}/>
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          className="flex-1 px-4 py-3 border rounded-xl text-sm" placeholder="Ask about compliance, training..."/>
        <button onClick={send} className="px-4 py-3 bg-[#1E3A5F] text-white rounded-xl"><Send className="h-5 w-5"/></button>
      </div>
    </div>
  )
}
