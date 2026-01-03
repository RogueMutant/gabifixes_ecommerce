import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price."],
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity."],
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  ingredients: String,
  howToUse: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
