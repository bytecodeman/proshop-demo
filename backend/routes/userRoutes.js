import express from "express";
import {
  authUser,
  resetPassword,
  getUserDetailsByUUID,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
  createUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/users

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.post("/resetpw", resetPassword);
router.put("/updatepw", updateUserPassword);
router.get("/uuid/:uuid", getUserDetailsByUUID);
router.post("/create", protect, admin, createUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

export default router;
