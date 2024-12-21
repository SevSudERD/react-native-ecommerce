import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
     users: defineTable({
          email: v.string(),
          name: v.string(),
          clerkId: v.string(),
     }).index("by_clerk_id", ["clerkId"]),

     courses: defineTable({
          title: v.string(),
          description:  v.string(),
          imageUrl: v.string(),
          price: v.number(),
          detailDescription: v.string(),
     })
}) 