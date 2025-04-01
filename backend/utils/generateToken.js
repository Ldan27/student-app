import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // 1.create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  // 2.save that token in the cookie
  res.cookie("jwtMK", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
