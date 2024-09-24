import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";

const userProfileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserProfile: build.query({
            query: () => {
                const token = localStorage.getItem('token'); // Get token from localStorage
                return {
                    url: "/user-profile",
                    method: "GET",
                    headers: {
                        Authorization: `${token}`, // Include the token in the Authorization header
                    },
                };
            },
            providesTags: [tagTypes.userProfile],
        }),
    })
})

export const {
    useGetUserProfileQuery,
} = userProfileApi;