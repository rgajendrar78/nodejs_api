import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  data: Buffer,
});

export const imageModel = mongoose.model("images", imageSchema);
