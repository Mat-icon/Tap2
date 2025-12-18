// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  members: defineTable({
    userId: v.string(), // Clerk user ID
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  })
    .index("by_user", ["userId"]),
});