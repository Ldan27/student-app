import express from "express";
import {
  createStudent,
  userAuth,
  userLogout,
  getStudentProfile,
  updateStudentProfile,
  getAllStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// @desc   create  the student
// route   POST /api/student
// access  Private/Admin
router.post("/auth", userAuth);
router.post("/logout", userLogout);
router.route("/profile").get(getStudentProfile).put(updateStudentProfile);
router.route("/").post(createStudent).get(getAllStudent);
router.route("/:id").put(updateStudent).delete(deleteStudent);

export default router;
