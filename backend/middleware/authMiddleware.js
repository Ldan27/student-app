import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../model/studentModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwtMK;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Student.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, not token ");
  }
});

const Admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
});

export { protect, Admin };
