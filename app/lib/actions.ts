"use server";

import dbConnect from "./db";
import Order from "./models/Order";
import User from "./models/User";
import Product from "./models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Ensure models are registered
const loadModels = () => {
  console.log("Models loaded:", !!Order, !!User, !!Product);
};

// ... Existing Order Actions ...

export async function fetchOrders() {
  await dbConnect();
  loadModels();

  try {
    const orders = await Order.find({})
      .populate("customer", "name email")
      .sort({ createdAt: -1 })
      .lean();

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
        product: p.product.toString(),
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
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false, error: "Failed to update order status." };
  }
}

// --- Product Actions ---

export async function fetchProducts(query: string = "") {
  await dbConnect();
  loadModels();

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ name: 1 })
      .lean();

    return products.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProductById(id: string) {
  await dbConnect();
  loadModels();

  try {
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Failed to fetch product.");
  }
}

export async function createProduct(formData: FormData) {
  await dbConnect();

  const rawFormData = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    category: formData.get("category"),
    description: formData.get("description"),
    image: formData.get("image") ? [formData.get("image")] : [], // Handle single image input for now
    ingredients: formData.get("ingredients"),
    howToUse: formData.get("howToUse"),
  };

  try {
    await Product.create(rawFormData);
  } catch (error) {
    console.error("Failed to create product:", error);
    return { message: "Database Error: Failed to Create Product." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products?status=created");
}

export async function updateProduct(id: string, formData: FormData) {
  await dbConnect();

  const rawFormData = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    category: formData.get("category"),
    description: formData.get("description"),
    image: formData.get("image") ? [formData.get("image")] : [],
    ingredients: formData.get("ingredients"),
    howToUse: formData.get("howToUse"),
  };

  try {
    await Product.findByIdAndUpdate(id, rawFormData);
  } catch (error) {
    console.error("Failed to update product:", error);
    return { message: "Database Error: Failed to Update Product." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products?status=updated");
}

export async function deleteProduct(id: string) {
  await dbConnect();
  try {
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/products");
    return { message: "Deleted Product." };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { message: "Database Error: Failed to Delete Product." };
  }
}

export async function fetchCategories() {
  await dbConnect();
  loadModels();

  try {
    // Fetch distinct categories from existing products
    // In a real app with a dedicated Category model, we'd fetch from there.
    // Here we'll get unique values from the Product collection and merge with standard ones.
    const productCategories = await Product.distinct("category");

    // Default standard categories to ensure they are always available even if no products exist
    const defaultCategories = [
      "Skincare",
      "Makeup",
      "Haircare",
      "Bodycare",
      "Fragrance",
    ];

    // Merge and remove duplicates
    const allCategories = Array.from(
      new Set([...defaultCategories, ...productCategories])
    ).sort();

    return allCategories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// --- Customer Actions ---

export async function fetchCustomers(query: string = "") {
  await dbConnect();
  loadModels();

  try {
    const customers = await User.find({
      role: "customer", // Optionally filter by role if we only want customers
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ registrationDate: -1 })
      .lean();

    return customers.map((user: any) => ({
      ...user,
      _id: user._id.toString(),
      registrationDate:
        user.registrationDate?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers.");
  }
}

export async function deleteUser(id: string) {
  await dbConnect();
  try {
    await User.findByIdAndDelete(id);
    revalidatePath("/admin/customers");
    return { message: "Deleted User." };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { message: "Database Error: Failed to Delete User." };
  }
}
