/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes/tagTypes";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
});
