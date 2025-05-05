import express from "express";
import {
  createStudent,
  userAuth,
  userLogout,
  getStudentProfile,
  updateStudentProfile,
  getAllStudent,
  getStudentByName,
  updateStudent,
  deleteStudent,
  FindByIdStudent,
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
  .get(protect, Admin, FindByIdStudent)
  .put(protect, Admin, updateStudent)
  .delete(protect, Admin, deleteStudent);
router.route("/search").post(protect, Admin, getStudentByName);

export default router;
