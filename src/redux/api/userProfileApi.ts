import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const userProfileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserProfile: build.query({
            query: () => ({
                url: "/user-profile",
                method: "GET"
            }),
            providesTags: [tagTypes.userProfile]
        }),
    })
})

export const {
    useGetUserProfileQuery,
} = userProfileApi;