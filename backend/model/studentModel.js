import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("Student", studentSchema);

export default student;
