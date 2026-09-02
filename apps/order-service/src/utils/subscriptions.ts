import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscriptions = async () => {
  consumer.subscribe("payment.successful", async (message) => {
    console.log("Received message: payment.successful", message);

    const order = message.value;

    if (!order?.userId || !order?.email || !order?.shippingAddress || !Array.isArray(order?.products)) {
      console.warn("Skipping invalid payment.successful message", order);
      return;
    }

    await createOrder(order);
  });
};