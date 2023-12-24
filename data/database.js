import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/nodejs_api").then(() => {
    console.log("connected to db");
  });
};
