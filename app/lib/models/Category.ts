import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this category."],
    unique: true,
    trim: true,
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image for this category."],
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
