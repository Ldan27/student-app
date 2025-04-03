import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

const createSlice = createApi({
  baseQuery,
  tagTypes: ["Student"],
  endpoints: (builder) => ({}),
});

export default createSlice;
