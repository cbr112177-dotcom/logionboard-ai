import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  companies: defineTable({
    name: v.string(), email: v.string(), stripeCustomerId: v.optional(v.string()),
    subscriptionTier: v.string(), createdAt: v.number(),
  }),
  employees: defineTable({
    companyId: v.id("companies"), firstName: v.string(), lastName: v.string(),
    email: v.string(), phone: v.optional(v.string()),
    role: v.union(v.literal("driver"), v.literal("admin"), v.literal("staff")),
    status: v.union(v.literal("onboarding"), v.literal("active"), v.literal("terminated")),
    onboardingProgress: v.number(), complianceScore: v.optional(v.number()),
    startDate: v.optional(v.number()), createdAt: v.number(),
  }),
  documents: defineTable({
    employeeId: v.id("employees"), type: v.string(), fileName: v.string(),
    status: v.union(v.literal("pending"), v.literal("uploaded"), v.literal("verified"), v.literal("flagged")),
    fileUrl: v.optional(v.string()), verifiedAt: v.optional(v.number()),
    complianceFlags: v.optional(v.array(v.string())),
  }),
  training_modules: defineTable({
    title: v.string(), description: v.string(), contentType: v.string(),
    content: v.array(v.object({ title: v.string(), body: v.string() })),
    questions: v.array(v.object({ question: v.string(), options: v.array(v.string()), correctIndex: v.number() })),
    passingScore: v.number(),
  }),
  training_progress: defineTable({
    employeeId: v.id("employees"), moduleId: v.id("training_modules"),
    completed: v.boolean(), score: v.optional(v.number()), completedAt: v.optional(v.number()),
  }),
  check_ins: defineTable({
    employeeId: v.id("employees"),
    type: v.union(v.literal("30day"), v.literal("60day"), v.literal("90day")),
    status: v.union(v.literal("pending"), v.literal("completed")),
    responses: v.optional(v.array(v.object({ question: v.string(), answer: v.string() }))),
    surveyScore: v.optional(v.number()), riskScore: v.optional(v.number()),
    createdAt: v.number(), completedAt: v.optional(v.number()),
  }),
  subscriptions: defineTable({
    companyId: v.id("companies"), stripeSubscriptionId: v.string(),
    tier: v.string(), status: v.string(), currentPeriodEnd: v.number(),
  }),
  onboarding_tasks: defineTable({
    employeeId: v.id("employees"), taskType: v.string(),
    status: v.union(v.literal("pending"), v.literal("completed")),
    assignedTo: v.optional(v.string()), dueDate: v.optional(v.number()), createdAt: v.number(),
  }),
});
