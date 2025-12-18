// convex/members.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// List all members for the authenticated user
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db
      .query("members")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

// Create a new member
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db.insert("members", {
      userId: identity.subject,
      name: args.name,
      email: args.email,
      phone: args.phone,
    });
  },
});

// Update a member
export const update = mutation({
  args: {
    id: v.id("members"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const member = await ctx.db.get(args.id);
    if (!member || member.userId !== identity.subject) {
      throw new Error("Not authorized");
    }
    
    await ctx.db.patch(args.id, {
      name: args.name,
      email: args.email,
      phone: args.phone,
    });
    
    return args.id;
  },
});

// Remove a member
export const remove = mutation({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const member = await ctx.db.get(args.id);
    if (!member || member.userId !== identity.subject) {
      throw new Error("Not authorized");
    }
    
    await ctx.db.delete(args.id);
  },
});