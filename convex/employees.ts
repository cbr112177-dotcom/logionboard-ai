import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEmployee = mutation({
  args: {
    companyId: v.id("companies"), firstName: v.string(), lastName: v.string(),
    email: v.string(), phone: v.optional(v.string()),
    role: v.union(v.literal("driver"), v.literal("admin"), v.literal("staff")),
    startDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("employees", {
      ...args, status: "onboarding", onboardingProgress: 0, createdAt: Date.now(),
    });
  },
});

export const getEmployees = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db.query("employees").filter(q => q.eq(q.field("companyId"), args.companyId)).collect();
  },
});

export const getEmployee = query({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateEmployee = mutation({
  args: { id: v.id("employees"), status: v.optional(v.union(v.literal("onboarding"), v.literal("active"), v.literal("terminated"))), onboardingProgress: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});
