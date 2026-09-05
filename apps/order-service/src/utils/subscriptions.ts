import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscriptions = async () => {
  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        const order = message.value;
        if (!order?.userId || !order?.email || !order?.shippingAddress || !Array.isArray(order?.products)) {
          return;
        }
        await createOrder(order);
      },
    },
  ]);
};