"use server";

import dbConnect from "./db";
import Order from "./models/Order";
import User from "./models/User";
import Product from "./models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut();
}

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

export async function fetchAnalytics() {
  await dbConnect();
  loadModels();

  try {
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });

    // Sales over last 7 months (or days depending on data density)
    // Group by Year-Month
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)), // Last 6 months + current
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format for Chart (e.g., "Jan 2025")
    const formattedSalesData = salesData.map((item: any) => {
      const date = new Date(item._id + "-01");
      return {
        name: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        sales: item.sales,
        orders: item.orders,
      };
    });

    // Top Selling Products
    // Unwind products array, group by product, count sum
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          quantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 1,
          quantity: 1,
          name: "$productInfo.name",
          price: "$productInfo.price",
          image: { $arrayElemAt: ["$productInfo.image", 0] },
        },
      },
    ]);

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      salesData: formattedSalesData,
      topProducts,
    };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    // Return empty data/zeros on failure rather than crashing page
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      salesData: [],
      topProducts: [],
    };
  }
}
