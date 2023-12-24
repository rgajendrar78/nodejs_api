import {
  deleteUserByID,
  authenticatedGetAllUsers,
  authenticatedGetCurrentUser,
  authenticatedGetUserByID,
  signInUser,
  signUpUser,
  authenticatedUpdateCurrentUser,
} from "../controllers/user.js";
import express from "express";
const router = express.Router();
router.post("/signUpUser", signUpUser);
router.post("/signInUser", signInUser);
router.get("/getCurrentUser", authenticatedGetCurrentUser);
router.get("/getAllUsers", authenticatedGetAllUsers);
router.get("/getUserByID/:id", authenticatedGetUserByID);
router.delete("/deleteUserByID/:id", deleteUserByID);
router.put("/updateCurrentUser", authenticatedUpdateCurrentUser);
export default router;
