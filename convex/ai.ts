import { v } from "convex/values";
import { action } from "./_generated/server";
export const chatWithAI = action({ args: { messages: v.array(v.object({ role: v.string(), content: v.string() })), companyContext: v.optional(v.string()) }, handler: async (ctx, args) => {
  try {
    const OpenAI = require("openai"); const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", messages: [{ role: "system", content: "You are LogiOnboard AI, a helpful assistant for small trucking/logistics companies. You answer questions about onboarding, FMCSA/DOT compliance, training, and company policies. Keep answers concise and practical." }, ...args.messages], max_tokens: 500 });
    return { response: completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request." };
  } catch (e: any) {
    return { response: `I'm running in offline mode. For AI-powered responses, set your OPENAI_API_KEY. Your question was: ${args.messages[args.messages.length-1]?.content}` };
  }
} });
export const complianceCheck = action({ args: { documentTypes: v.array(v.string()) }, handler: async (ctx, args) => {
  const flags: string[] = [];
  const required = ["i9", "w4", "driversLicense", "medicalCard", "drugScreen", "mvr"];
  required.forEach(r => { if (!args.documentTypes.includes(r)) flags.push(`Missing: ${r}`); });
  return { compliant: flags.length === 0, flags };
} });
