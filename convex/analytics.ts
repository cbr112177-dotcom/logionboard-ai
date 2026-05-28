import { query } from "./_generated/server";
import { v } from "convex/values";
export const getCompanyDashboard = query({ args: { companyId: v.id("companies") }, handler: async (ctx, args) => {
  const employees = await ctx.db.query("employees").filter(q => q.eq(q.field("companyId"), args.companyId)).collect();
  const total = employees.length; const active = employees.filter(e => e.status === "active").length;
  const onboarding = employees.filter(e => e.status === "onboarding").length;
  const avgProgress = total > 0 ? Math.round(employees.reduce((s, e) => s + e.onboardingProgress, 0) / total) : 0;
  const docs = await ctx.db.query("documents").collect(); const flagged = docs.filter(d => d.status === "flagged").length;
  return { total, active, onboarding, avgProgress, flaggedDocs: flagged };
} });
