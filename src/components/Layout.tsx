import { ReactNode } from "react"
import Sidebar from "./Sidebar"
export default function Layout({children}:{children:ReactNode}){
  return <div className="flex h-screen bg-gray-50"><Sidebar/><main className="flex-1 overflow-auto p-6">{children}</main></div>
}
