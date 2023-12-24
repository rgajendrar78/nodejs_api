import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token not provided",
    });
  }

  jwt.verify(token, "1234567890", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate Password format
export const isValidPassword = (password) => {
  return password.length >= 8;
};

// Other authentication-related functions can go here

// Function to generate a new access token
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, "1234567890", { expiresIn: "15m" }); // Adjust the expiration time as needed
};
// Function to generate a new refresh token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, "1234567890", { expiresIn: "7d" }); // Adjust the expiration time as needed
};
