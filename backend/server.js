import express from "express";
import studentApi from "./routes/studentRoute.js";
const port = 4000;

const app = express();

// route Api
app.use("/api/student", studentApi);

app.get("/", (req, res) => res.send("Hi how are you today ?"));

app.listen(port, () => console.log(`server is listening on port ${port}`));
