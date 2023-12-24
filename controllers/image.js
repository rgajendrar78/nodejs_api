import multer from "multer";
import { imageModel } from "../models/image.js";

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");

export const imageUpload = async (req, res) => {
  try {
    // Save image information to MongoDB
    const newImage = new imageModel({
      filename: req.file.filename,
      path: req.file.path,
    });

    await newImage.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
