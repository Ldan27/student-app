import express from "express";
import studentApi from "./routes/studentRoute.js";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

// route Api
app.use("/api/student", studentApi);

// middleware
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Hi how are you today ?"));

app.listen(port, () => console.log(`server is listening on port ${port}`));
