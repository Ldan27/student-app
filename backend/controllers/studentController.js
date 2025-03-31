import Student from "../model/studentModel.js";

// @desc   create  the student
// route   POST /api/student
// access  Private/Admin
const createStudent = async (req, res) => {
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
};

// @desc   student or Admin authenticate and get token
// route   POST /api/student/auth
// access  Public
const userAuth = (req, res) => {
  res.send("student or Admin authenticated");
};

// @desc   student or admin logout and clear cookie
// route   POST /api/student/logout
// access  Public
const userLogout = (req, res) => {
  res.send("Student or Admin logout");
};

// @desc   get student profile
// route   GET /api/student/profile
// access  Private
const getStudentProfile = (req, res) => {
  res.send("get student profile");
};

// @desc   update student profile
// route   PUT /api/student/profile
// access  Private
const updateStudentProfile = (req, res) => {
  res.send("update Student proflie");
};

// @desc   get all the student
// route   GET /api/student
// access  Private/Admin
const getAllStudent = (req, res) => {
  res.send("student gotten");
};

// @desc   update student profile
// route   PUT /api/student/:id
// access  Private/Admin
const updateStudent = (req, res) => {
  res.send("update student");
};

// @desc   delete student
// route   DELETE /api/student/:id
// access  Private/Admin
const deleteStudent = (req, res) => {
  res.send("delete Student");
};

export {
  createStudent,
  userAuth,
  userLogout,
  getStudentProfile,
  updateStudentProfile,
  getAllStudent,
  updateStudent,
  deleteStudent,
};
