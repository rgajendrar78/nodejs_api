import { productModel } from "../models/product.js";

//create products api
export const addProduct = async (req, res) => {
  try {
    const { user_id, name, brand, description } = req.body;

    // Validate input data
    if (!user_id || !name || !brand || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid input data. Please provide user_id, name, brand, and description.",
      });
    }

    // Create a new product
    const newProduct = await productModel.create({
      user_id,
      name,
      brand,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const { id } = req.body;

    // Query the database to get all products for a specific user
    const allProducts = await productModel
      .find({ user_id: id })
      .populate("user_id", "name email"); // Populate user information (adjust fields as needed)

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// search product by single attribute name
export const searchProduct = async (req, res) => {
  try {
    const { product } = req.query;
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query",
      });
    }

    // Use a case-insensitive regular expression for the search
    const regex = new RegExp(product, "i");

    // Search for products that match the query in name, brand, or description
    const result = await productModel.find({
      $or: [
        { name: { $regex: regex } },
        { brand: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Search successful",
      results: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// search product by multiple attributes name like filter
export const searchProductFilter = async (req, res) => {
  try {
    const { name, brand, description } = req.query;

    // Check if at least one parameter is provided
    if (!name && !brand && !description) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one search parameter (name, brand, or description)",
      });
    }

    // Build a query object based on the provided parameters
    const queryObject = {};
    if (name) queryObject.name = { $regex: new RegExp(name, "i") };
    if (brand) queryObject.brand = { $regex: new RegExp(brand, "i") };
    if (description)
      queryObject.description = { $regex: new RegExp(description, "i") };

    // Search for products that match the specified criteria
    const result = await productModel.find(queryObject);

    res.status(200).json({
      success: true,
      message: "Search successful",
      results: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
