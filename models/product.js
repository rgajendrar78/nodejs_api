import mongoose from "mongoose";

// product schema
const productSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", //referencing to User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// create model
export const productModel = mongoose.model("products", productSchema);
