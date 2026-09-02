import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";

const normalizeOrder = (order: Partial<OrderType>): OrderType => {
  return {
    userId: String(order.userId ?? ""),
    email: String(order.email ?? ""),
    amount: Number(order.amount ?? 0),
    status:
      order.status === "success" || order.status === "failed"
        ? order.status
        : "failed",
    shippingAddress: String(order.shippingAddress ?? "Not provided"),
    products: (order.products ?? []).map((product) => ({
      name: String(product.name ?? "Unknown product"),
      quantity: Number(product.quantity ?? 0),
      price: Number(product.price ?? 0),
    })),
  } as OrderType;
};

export const createOrder = async (order: OrderType) => {
  const normalizedOrder = normalizeOrder(order);

  try {
    const newOrder = new Order(normalizedOrder);
    await newOrder.save();
  } catch (error) {
    console.log("Order save failed:", error);
    throw error;
  }
};