import express from "express";
import {
  createStudent,
  userAuth,
  userLogout,
  getStudentProfile,
  updateStudentProfile,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { protect, Admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", userAuth);
router.post("/logout", userLogout);
router
  .route("/profile")
  .get(protect, getStudentProfile)
  .put(protect, updateStudentProfile);
router
  .route("/")
  .post(protect, Admin, createStudent)
  .get(protect, Admin, getAllStudent);
router
  .route("/:id")
  .put(protect, Admin, updateStudent)
  .get(protect, Admin, getStudentById)
  .delete(protect, Admin, deleteStudent);

export default router;
