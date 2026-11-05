import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { amount } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json(paymentIntent.client_secret);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}