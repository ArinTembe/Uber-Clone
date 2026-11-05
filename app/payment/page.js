"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ amount, car }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/?booked=true` },
    });

    // only reached if payment fails (success redirects automatically)
    setMessage(error.message);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <p className="font-bold text-lg mb-1">{car} ride</p>
      <p className="text-gray-500 mb-4">Total: ₹{amount}</p>
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="p-3 bg-black text-white w-full mt-5 rounded-lg active:scale-95 transition duration-150"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
      {message && <p className="text-red-600 mt-3">{message}</p>}
    </form>
  );
}

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [car, setCar] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("amount");
    setAmount(a);
    setCar(params.get("car"));

    fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: a }),
    })
      .then((res) => res.json())
      .then((secret) => setClientSecret(secret));
  }, []);

  if (!clientSecret) return <p className="p-6">Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm amount={amount} car={car} />
    </Elements>
  );
}