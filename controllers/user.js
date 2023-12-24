import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
  isValidEmail,
  isValidPassword,
  verifyToken,
} from "./authController.js";

// signUpUser user
export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation error messages
  const validationErrors = [];

  // Validate name
  if (!name) {
    validationErrors.push("Name is required");
  }

  // Validate email format
  if (!email || !isValidEmail(email)) {
    validationErrors.push("Invalid email format");
  }

  // Validate password strength
  if (!password || !isValidPassword(password)) {
    validationErrors.push("Password must be at least 8 characters long");
  }

  // Check if there are any validation errors
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: validationErrors,
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json("Email already exists");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token with the ID of the newly created user
    const token = generateAccessToken(newUser._id);

    // Generate refresh token
    const refreshToken = generateRefreshToken(newUser._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// signinUser user
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user with the given email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Invalid password.",
      });
    }
    // Generate access token
    const accessToken = generateAccessToken(user._id);
    // Generate refresh token
    const refreshToken = generateRefreshToken(user._id);
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password"); // Exclude the 'password' field from the response
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Use the verifyToken middleware for authentication
export const authenticatedGetAllUsers = [verifyToken, getAllUsers];

//get current user details
export const getCurrentUser = async (req, res) => {
  const { userId } = req; // Use the userId extracted from the token
  try {
    const user = await userModel.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const authenticatedGetCurrentUser = [verifyToken, getCurrentUser];

// Get user by ID
export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id, "-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Use the verifyToken middleware for authentication
export const authenticatedGetUserByID = [verifyToken, getUserByID];

//delete user by id
export const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Use the verifyToken middleware for authentication
    verifyToken(req, res, async () => {
      // The user is authenticated, proceed with user deletion
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.json({
        success: true,
        message: "User deleted successfully",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update user by ID
// Update current user details
export const updateCurrentUser = async (req, res) => {
  const { userId } = req; // Use the userId extracted from the token
  const { name, email } = req.body;
  try {
    // Proceed with the update
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, select: "-password" }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const authenticatedUpdateCurrentUser = [verifyToken, updateCurrentUser];
