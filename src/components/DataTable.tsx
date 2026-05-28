interface C{key:string;label:string;render?:(v:any,r:any)=>React.ReactNode}
export default function DataTable({columns,data}:{columns:C[];data:any[]}){
  return <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200">{columns.map(c=><th key={c.key} className="text-left py-3 px-4 font-semibold text-gray-600">{c.label}</th>)}</tr></thead><tbody>{data.map((r,i)=><tr key={i} className="border-b border-gray-100 hover:bg-gray-50">{columns.map(c=><td key={c.key} className="py-3 px-4">{c.render?c.render(r[c.key],r):r[c.key]}</td>)}</tr>)}</tbody></table></div>
}
