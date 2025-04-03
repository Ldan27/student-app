import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentInfo: localStorage.getItem("studentInfo")
    ? JSON.parse(localStorage.getItem("studentInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStudentInfo: (state, action) => {
      state.studentInfo = action.payload;
      localStorage.setItem("studentInfo", JSON.stringify(action.payload));
    },
    clearStudentInfo: (state, action) => {
      state.studentInfo = null;
      localStorage.removeItem("studentInfo");
    },
  },
});

export const { setStudentInfo, clearStudentInfo } = authSlice.actions;

export default authSlice.reducer;
