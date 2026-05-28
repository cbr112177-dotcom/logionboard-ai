import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const uploadDocument = mutation({
  args: { employeeId: v.id("employees"), type: v.string(), fileName: v.string(), fileUrl: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documents", { ...args, status: "uploaded" });
  },
});

export const getDocuments = query({
  args: { employeeId: v.id("employees") },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").filter(q => q.eq(q.field("employeeId"), args.employeeId)).collect();
  },
});

export const verifyDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "verified", verifiedAt: Date.now() });
  },
});

export const flagDocument = mutation({
  args: { id: v.id("documents"), flags: v.array(v.string()) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "flagged", complianceFlags: args.flags });
  },
});
