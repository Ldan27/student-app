import apiSlice from "./apiSlice";
const STUDENT_URL = "/api/student";

const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${STUDENT_URL}/logout`,
        method: "POST",
      }),
    }),
    updateStudentProfile: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllStudent: builder.query({
      query: () => ({
        url: STUDENT_URL,
      }),
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: STUDENT_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/${data.studentId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getStudentById: builder.query({
      query: (studentId) => ({
        url: `${STUDENT_URL}/${studentId}`,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `${STUDENT_URL}/${studentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useUpdateStudentProfileMutation,
  useGetAllStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
  useDeleteStudentMutation,
} = studentApiSlice;
