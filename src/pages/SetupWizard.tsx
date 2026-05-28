import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateCompany } from "../lib/store"
import { ShieldCheck, Building2, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react"

export default function SetupWizard() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [done, setDone] = useState(false)
  const nav = useNavigate()

  const saveCompany = () => {
    updateCompany({ name: name || "My Trucking Company", location: location || "Your City, State" })
    setDone(true)
    setTimeout(() => nav("/dashboard"), 2000)
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">You're All Set!</h1>
        <p className="text-gray-500">Taking you to your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center gap-2 mb-8">
        <ShieldCheck className="h-6 w-6 text-[#F59E0B]" />
        <span className="font-bold text-xl">LogiOnboard AI</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Welcome to LogiOnboard AI!</h1>
      <p className="text-gray-500 mb-8">Let's get your company set up in under 2 minutes.</p>

      {step === 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-8 w-8 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold">Your Company</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-lg" placeholder="e.g. Jones Trucking LLC" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-lg" placeholder="e.g. Searcy, AR" />
            </div>
          </div>
          <button onClick={() => setStep(1)}
            className="mt-6 w-full bg-[#1E3A5F] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="h-8 w-8 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold">Connect Stripe (Optional)</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Connect Stripe to start charging customers $49–$99/month. 
            You can skip this and set it up later in Settings.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Stripe connection will be available after Marketplace deploys your copy</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold">Back</button>
            <button onClick={saveCompany}
              className="flex-1 bg-[#F59E0B] text-[#1E3A5F] py-3 rounded-lg font-bold">Skip & Finish</button>
          </div>
        </div>
      )}
    </div>
  )
}
