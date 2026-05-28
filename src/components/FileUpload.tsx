import { Upload } from "lucide-react"
export default function FileUpload({label}:{label:string}){
  return <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E3A5F] transition"><Upload className="h-8 w-8 text-gray-400 mx-auto mb-2"/><p className="text-sm text-gray-600">{label}</p><p className="text-xs text-gray-400 mt-1">Click to upload</p></div>
}
