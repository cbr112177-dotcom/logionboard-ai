import { cn } from "../lib/utils"
export default function ProgressSteps({steps,current}:{steps:string[];current:number}){
  return <div className="flex items-center justify-between mb-8">{steps.map((s,i)=>(
    <div key={i} className="flex items-center flex-1">
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",i<=current?"bg-[#1E3A5F] text-white":"bg-gray-200 text-gray-500")}>{i+1}</div>
      <span className={cn("text-sm ml-2 hidden sm:block",i<=current?"text-[#1E3A5F]":"text-gray-400")}>{s}</span>
      {i<steps.length-1&&<div className={cn("flex-1 h-0.5 mx-2",i<current?"bg-[#1E3A5F]":"bg-gray-200")}/>}
    </div>))}</div>
}
