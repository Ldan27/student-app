import express from "express";
import path from "path";
import studentApi from "./routes/studentRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

ConnectDB();

// Middleware for parsing raw json and urlEncoded for forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route Api
app.use("/api/student", studentApi);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// middleware for Errors
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Hi how are you today ?"));

app.listen(port, () => console.log(`server is listening on port ${port}`));
