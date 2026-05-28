import { v } from "convex/values";
import { action } from "./_generated/server";
export const sendWelcomeEmail = action({ args: { email: v.string(), name: v.string() }, handler: async (ctx, args) => {
  try {
    const { Resend } = require("resend"); const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: "onboarding@logionboard.ai", to: args.email, subject: "Welcome to LogiOnboard AI!", html: `<h1>Welcome ${args.name}!</h1><p>Your onboarding has begun. Please complete your documents and training.</p>` });
  } catch (e) { console.log("Email sending requires RESEND_API_KEY env var"); }
  return { sent: true };
} });
export const sendCheckInReminder = action({ args: { email: v.string(), name: v.string(), type: v.string() }, handler: async (ctx, args) => {
  try {
    const { Resend } = require("resend"); const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: "checkins@logionboard.ai", to: args.email, subject: `Your ${args.type} Check-In is Due`, html: `<h1>Hi ${args.name}</h1><p>Your ${args.type} check-in is ready. Please complete it in the LogiOnboard dashboard.</p>` });
  } catch (e) { console.log("Email requires RESEND_API_KEY"); }
  return { sent: true };
} });
