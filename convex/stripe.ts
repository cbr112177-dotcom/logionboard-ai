import { v } from "convex/values";
import { action } from "./_generated/server";
const stripeSecret = process.env.STRIPE_SECRET_KEY!;
export const createCheckoutSession = action({ args: { companyId: v.string(), tier: v.string() }, handler: async (ctx, args) => {
  const Stripe = require("stripe"); const stripe = new Stripe(stripeSecret);
  const prices: Record<string, string> = { starter: "price_starter", growth: "price_growth", scale: "price_scale" };
  const session = await stripe.checkout.sessions.create({ mode: "subscription", line_items: [{ price: prices[args.tier] || prices.growth, quantity: 1 }], success_url: `${process.env.SITE_URL}/dashboard`, cancel_url: `${process.env.SITE_URL}/billing`, metadata: { companyId: args.companyId } });
  return session.url;
} });
export const handleWebhook = action({ args: { signature: v.string(), body: v.string() }, handler: async (ctx, args) => {
  const Stripe = require("stripe"); const stripe = new Stripe(stripeSecret);
  const event = stripe.webhooks.constructEvent(args.body, args.signature, process.env.STRIPE_WEBHOOK_SECRET!);
  if (event.type === "checkout.session.completed") { const session = event.data.object; /* handle subscription created */ }
  return { received: true };
} });
