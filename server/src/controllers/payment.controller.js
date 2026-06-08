import Stripe from "stripe";

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function createPaymentIntent(req, res) {
  try {
    const { amount, currency = "usd" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Demo mode — no Stripe key configured
    if (!stripe) {
      return res.json({
        demo: true,
        clientSecret: `demo_secret_${Date.now()}`,
        amount,
        currency,
        message: "Demo mode — payment simulated",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { userId: req.user.id },
    });

    res.json({ clientSecret: paymentIntent.client_secret, demo: false });
  } catch (e) {
    console.error("Payment intent error:", e);
    res.status(500).json({ message: "Payment processing error" });
  }
}
