import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const memberId = await ctx.db.insert("members", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      createdAt: Date.now(),
    });
    return memberId;
  },
});


export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("members").collect();
  },
});


export const update = mutation({
  args: {
    id: v.id("members"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, { id, name, email, phone }) => {
    await ctx.db.patch(id, {
      name,
      email,
      phone,
    });
    return id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("members"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});
