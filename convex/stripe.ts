import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import stripe from "../lib/stripe";

export const createCheckoutSession = action({
	args: { courseId: v.id("courses") },
	handler: async (ctx, args): Promise<{ checkoutUrl: string | null }> => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Unauthorized");
		}


	

		const course = await ctx.runQuery(api.courses.getCourseById, {
			courseId: args.courseId,
		});

		if (!course) {
			throw new ConvexError("Course not found");
		}

		const session = await stripe.checkout.sessions.create({
		
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: course.title,
							images: [course.imageUrl],
						},
						unit_amount: Math.round(course.price * 100),
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${args.courseId}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses`,

			metadata: {
				courseId: args.courseId,
			
				
			},
		});

		return { checkoutUrl: session.url };
	},
});

export const createProPlanCheckoutSession = action({
	args: { planId: v.union(v.literal("month"), v.literal("year")) },
	handler: async (ctx, args): Promise<{ checkoutUrl: string | null }> => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		
	

		// rate limit
		
		
		let priceId;
		if (args.planId === "month") {
			priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
		} else if (args.planId === "year") {
			priceId = process.env.STRIPE_YEARLY_PRICE_ID;
		}

		if (!priceId) {
			throw new ConvexError("PriceId not provided");
		}

		const session = await stripe.checkout.sessions.create({
			
			line_items: [{ price: priceId, quantity: 1 }],
			mode: "subscription",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pro/success?session_id={CHECKOUT_SESSION_ID}&year=${args.planId === "year"}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pro`,

			
		});

		return { checkoutUrl: session.url };
	},
});