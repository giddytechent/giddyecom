import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRoute = new Hono();

const formatShippingAddress = (address?: Stripe.Address | null) => {
  if (!address) return "Not provided";

  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postal_code,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};

webhookRoute.post("/stripe", async (c) => {
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (error) {
    console.log("webhook verification failed");
    return c.json({ error: "Webhook verification failed" }, 400);
  }

  if (event.type !== "checkout.session.completed") {
    return c.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  const shippingAddress = formatShippingAddress(session.customer_details?.address);

  const orderPayload = {
    userId: session.client_reference_id ?? "",
    email: session.customer_details?.email ?? "",
    amount: session.amount_total ?? 0,
    status: session.payment_status === "paid" ? "success" : "failed",
    shippingAddress,
    products: lineItems.data.map((item) => ({
      name: item.description ?? "Product",
      quantity: item.quantity ?? 0,
      price: item.price?.unit_amount ?? 0,
    })),
  };

  const isValidOrderPayload =
    !!orderPayload.userId &&
    !!orderPayload.email &&
    typeof orderPayload.amount === "number" &&
    orderPayload.amount > 0 &&
    !!orderPayload.shippingAddress &&
    orderPayload.products.length > 0;

  if (!isValidOrderPayload) {
    console.warn("Invalid order payload before Kafka send", orderPayload);
    return c.json({ error: "Invalid order payload" }, 400);
  }

  await producer.send("payment.successful", {
    value: orderPayload,
  });

  return c.json({ received: true });
});

export default webhookRoute;