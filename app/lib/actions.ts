"use server";

import dbConnect from "./db";
import Order from "./models/Order";
import User from "./models/User";
import { revalidatePath } from "next/cache";

// Ensure models are registered
const loadModels = () => {
  // We just need to import them, but dbConnect usually handles connection.
  // Mongoose models are registered upon first import/definition.
  // We import User here to ensure population works if not already loaded.
  console.log("Models loaded:", !!Order, !!User);
};

export async function fetchOrders() {
  await dbConnect();
  loadModels();

  try {
    const orders = await Order.find({})
      .populate("customer", "name email")
      .sort({ createdAt: -1 })
      .lean();

    // Convert _id and dates to serializable format
    return orders.map((order: any) => ({
      ...order,
      _id: order._id.toString(),
      customer: order.customer
        ? {
            ...order.customer,
            _id: order.customer._id.toString(),
          }
        : null,
      products: order.products.map((p: any) => ({
        ...p,
        _id: p._id.toString(),
        product: p.product.toString(), // Just ID for now, populate if needed
      })),
      createdAt: order.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Failed to fetch orders.");
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  await dbConnect();

  try {
    await Order.findByIdAndUpdate(orderId, { status });
    revalidatePath("/admin/orders");
    revalidatePath("/admin"); // Update dashboard stats too
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false, error: "Failed to update order status." };
  }
}
