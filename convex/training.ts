import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getModules = query({
  handler: async (ctx) => {
    return await ctx.db.query("training_modules").collect();
  },
});

export const getProgress = query({
  args: { employeeId: v.id("employees") },
  handler: async (ctx, args) => {
    return await ctx.db.query("training_progress").filter(q => q.eq(q.field("employeeId"), args.employeeId)).collect();
  },
});

export const submitQuiz = mutation({
  args: { employeeId: v.id("employees"), moduleId: v.id("training_modules"), score: v.number() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("training_progress").filter(q => q.eq(q.field("employeeId"), args.employeeId)).filter(q => q.eq(q.field("moduleId"), args.moduleId)).first();
    if (existing) {
      await ctx.db.patch(existing._id, { score: args.score, completed: true, completedAt: Date.now() });
    } else {
      await ctx.db.insert("training_progress", { employeeId: args.employeeId, moduleId: args.moduleId, completed: true, score: args.score, completedAt: Date.now() });
    }
  },
});

export const seedModules = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("training_modules").first();
    if (existing) return;
    const modules = [
      { title: "Safety & Compliance Fundamentals", description: "DOT/FMCSA safety regulations, PPE, accident prevention", contentType: "safety", passingScore: 70, content: [{ title: "DOT/FMCSA Overview", body: "The Federal Motor Carrier Safety Administration (FMCSA) regulates commercial motor vehicle safety..." }, { title: "Personal Protective Equipment", body: "Proper PPE includes high-visibility vests, safety boots, gloves, and hard hats..." }], questions: [{ question: "What does FMCSA stand for?", options: ["Federal Motor Carrier Safety Administration", "Freight Management Safety Agency", "Fleet Carrier Standards Association"], correctIndex: 0 }, { question: "How often must a DOT physical be renewed?", options: ["Every 6 months", "Every 2 years", "Every year"], correctIndex: 1 }] },
      { title: "Daily Operations & Procedures", description: "Pre-trip inspections, HOS logging, route planning", contentType: "operations", passingScore: 70, content: [{ title: "Pre-Trip Inspections", body: "A thorough pre-trip inspection should be completed before every trip..." }, { title: "Hours of Service", body: "Drivers may drive a maximum of 11 hours after 10 consecutive hours off duty..." }], questions: [{ question: "What is the maximum driving time per day?", options: ["10 hours", "11 hours", "14 hours"], correctIndex: 1 }, { question: "When should a pre-trip inspection be done?", options: ["After each trip", "Before each trip", "Once a week"], correctIndex: 1 }] },
      { title: "Company Policy & Culture", description: "Code of conduct, attendance, reporting, professionalism", contentType: "policy", passingScore: 70, content: [{ title: "Code of Conduct", body: "All employees are expected to maintain professional standards..." }, { title: "Attendance Policy", body: "Employees must notify their supervisor at least 2 hours before shift start if unable to report..." }], questions: [{ question: "When should you report an accident?", options: ["Within 24 hours", "Immediately", "By end of shift"], correctIndex: 1 }, { question: "How many unexcused absences trigger review?", options: ["2", "3", "5"], correctIndex: 1 }] },
    ];
    for (const m of modules) {
      await ctx.db.insert("training_modules", m);
    }
  },
});
