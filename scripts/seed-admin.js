const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(); // Uses database from URI or default
    const usersCollection = db.collection("users");

    const adminEmail = "admin@gabifixes.com";
    const existingAdmin = await usersCollection.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const result = await usersCollection.insertOne({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      image: "",
      registrationDate: new Date(),
    });

    console.log(`Created admin user with ID: ${result.insertedId}`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: admin123`);
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await client.close();
  }
}

seedAdmin();
