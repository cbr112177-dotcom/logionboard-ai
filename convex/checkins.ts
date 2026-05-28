import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const createCheckIn = mutation({ args: { employeeId: v.id("employees"), type: v.union(v.literal("30day"), v.literal("60day"), v.literal("90day")) }, handler: async (ctx, args) => { return await ctx.db.insert("check_ins", { ...args, status: "pending", createdAt: Date.now() }); } });
export const getPendingCheckIns = query({ args: { companyId: v.id("companies") }, handler: async (ctx, args) => { return await ctx.db.query("check_ins").collect(); } });
export const submitCheckIn = mutation({ args: { id: v.id("check_ins"), responses: v.array(v.object({ question: v.string(), answer: v.string() })), surveyScore: v.number(), riskScore: v.number() }, handler: async (ctx, args) => { await ctx.db.patch(args.id, { status: "completed", responses: args.responses, surveyScore: args.surveyScore, riskScore: args.riskScore, completedAt: Date.now() }); } });
