import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Student"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
