import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { productData } from "../app/lib/data";
import Product from "../app/lib/models/Product";
import Category from "../app/lib/models/Category";
import User from "../app/lib/models/User";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const categories = [
  {
    name: "Skincare",
    image: "/pearl_skin.jpg",
  },
  {
    name: "Makeup",
    image: "/mk_artist_2.jpg",
  },
  {
    name: "Haircare",
    image: "/shampoo_bath.jpg",
  },
];

async function seed() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected.");

    // Clear existing data
    console.log("Clearing existing data...");
    await Product.deleteMany({});
    await Category.deleteMany({});
    // We keep users for now or seed an admin
    console.log("Data cleared.");

    // Seed Categories
    console.log("Seeding categories...");
    await Category.insertMany(categories);
    console.log("Categories seeded.");

    // Seed Products
    console.log("Seeding products...");
    const productsToSeed = productData.map((p) => {
      const { id: _, ...rest } = p;
      return {
        ...rest,
        images: p.image, // Product model uses 'images' (array of strings)
      };
    });
    await Product.insertMany(productsToSeed);
    console.log("Products seeded.");

    // Optionally seed an admin user if none exists
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log("Creating admin user...");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created: admin@example.com / admin123");
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
