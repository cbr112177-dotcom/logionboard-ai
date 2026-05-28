import { CreditCard, CheckCircle2 } from "lucide-react"

const plans = [
  { n: "Starter", p: 49, e: 5, cur: false, f: ["Up to 5 employees", "Document collection", "Basic compliance", "Email support"] },
  { n: "Growth", p: 79, e: 20, cur: true, f: ["Up to 20 employees", "Everything in Starter", "AI compliance", "Training modules", "Priority support"] },
  { n: "Scale", p: 99, e: 50, cur: false, f: ["Up to 50 employees", "Everything in Growth", "AI chat", "Analytics", "Custom templates"] },
]

function getPriceId(tier: string): string {
  const ids: Record<string, string | undefined> = {
    starter: import.meta.env.VITE_STRIPE_PRICE_STARTER,
    growth: import.meta.env.VITE_STRIPE_PRICE_GROWTH,
    scale: import.meta.env.VITE_STRIPE_PRICE_SCALE,
  }
  return ids[tier] || ""
}

function subscribe(tier: string) {
  const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  const priceId = getPriceId(tier)
  
  if (!pk || pk.includes("YOUR_KEY")) {
    alert("Stripe not connected. Add VITE_STRIPE_PUBLISHABLE_KEY to your Vercel env vars.")
    return
  }
  if (!priceId || priceId.includes("YOUR")) {
    alert("Price ID not configured yet.")
    return
  }

  const checkoutUrl = `https://checkout.stripe.com/pay/${priceId}?prefilled_email=&client_reference_id=${Date.now()}`
  window.open(checkoutUrl, "_blank")
}

export default function BillingPage() {
  const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  const connected = pk && !pk.includes("YOUR_KEY")

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscription</h1>
      
      {!connected && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-amber-800 mb-2">Connect Stripe to accept payments</h2>
          <p className="text-amber-700 text-sm mb-4">
            Add this to your Vercel dashboard → Settings → Environment Variables:
          </p>
          <div className="bg-white rounded-lg p-4 text-sm font-mono">
            <p><span className="text-gray-500">VITE_STRIPE_PUBLISHABLE_KEY</span> = pk_live_...</p>
            <p className="text-gray-400 text-xs mt-2">Get your key at https://dashboard.stripe.com/apikeys</p>
          </div>
        </div>
      )}

      {connected && (
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-6 w-6 text-[#1E3A5F]" />
            <h2 className="font-semibold">Current Plan: Growth</h2>
          </div>
          <p className="text-sm text-gray-500 mb-2">$79/month • 20 employees</p>
          <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Stripe connected</p>
        </div>
      )}

      <h2 className="font-semibold mb-4">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.n} className={`bg-white rounded-xl p-6 shadow-sm border ${p.cur ? "border-[#1E3A5F] ring-2 ring-[#1E3A5F]" : ""}`}>
            <h3 className="font-bold text-lg">{p.n}</h3>
            <p className="text-3xl font-extrabold my-2">${p.p}<span className="text-sm font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-4">Up to {p.e} employees</p>
            <ul className="space-y-2 mb-6">
              {p.f.map(f => <li key={f} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" />{f}</li>)}
            </ul>
            {p.cur ? (
              <span className="block w-full text-center py-2 bg-[#1E3A5F] text-white rounded-lg text-sm font-semibold">Current Plan</span>
            ) : (
              <button onClick={() => subscribe(p.n.toLowerCase())}
                className="block w-full text-center py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
