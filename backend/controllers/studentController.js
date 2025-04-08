import Student from "../model/studentModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc   create  the student
// route   POST /api/student
// access  Private/Admin
const createStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const student = await Student.create({
    name,
    email,
    password,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid student data");
  }
});

// @desc   student or Admin authenticate and get token
// route   POST /api/student/auth
// access  Public
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (student && (await student.matchPassword(password))) {
    generateToken(res, student._id);
    res.status(200).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      isAdmin: student.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   student or admin logout and clear cookie
// route   POST /api/student/logout
// access  Public
const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwtMK", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ msg: "user logged out" });
});

// @desc   get student profile
// route   GET /api/student/profile
// access  Private
const getStudentProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// @desc   update student profile
// route   PUT /api/student/profile
// access  Private
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id);

  if (student) {
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;

    if (req.body.password) {
      student.password = req.body.password || student.password;
    }
    const updatedStudent = await student.save();

    res.status(200).json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      email: updatedStudent.email,
    });
  } else {
    res.status(404);
    throw new Error("Not Found!!!");
  }
});

// @desc   get all the student
// route   GET /api/student
// access  Private/Admin
const getAllStudent = asyncHandler(async (req, res) => {
  const student = await Student.find({ isAdmin: { $ne: true } });

  if (student) {
    res.status(200).json(student);
  } else {
    res.status(400);
    throw new Error("Failed to load Student");
  }
});

// @desc   get student by id
// route   GET /api/student/:id
// access  Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).select("-password");

  if (student) {
    const studentFound = {
      _id: student._id,
      name: student.name,
      email: student.email,
    };

    res.status(200).json(studentFound);
  } else {
    res.status(404);
    throw new Error("Student not Found");
  }
});

// @desc   update student
// route   PUT /api/student/:id
// access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).select("-password");

  if (student) {
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;

    const StudentUpdated = await student.save();

    res.status(200).json({
      _id: StudentUpdated._id,
      name: StudentUpdated.name,
      email: StudentUpdated.email,
    });
  } else {
    res.status(404);
    throw new Error("student not found");
  }
});

// @desc   delete student
// route   DELETE /api/student/:id
// access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    if (student.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete Admin");
    }

    await Student.deleteOne({ _id: student._id });

    res.status(200).json({ msg: "Student successfully deleted!!!" });
  } else {
    res.status(404);
    throw new Error("Student not Found!!!");
  }
});

export {
  createStudent,
  userAuth,
  userLogout,
  getStudentProfile,
  updateStudentProfile,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
