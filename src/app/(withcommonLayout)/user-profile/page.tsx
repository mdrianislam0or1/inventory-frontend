/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useGetUserProfileQuery } from '@/redux/api/userProfileApi'
import React from 'react'

export default function UserProfile() {
    // Use the query hook to fetch the user profile data
    const { data, error, isLoading } = useGetUserProfileQuery({});

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        return (
            <div>
                error
            </div>
        );
    }

    return (
        <div>
            <h1>User Profile</h1>
            {data ? (
                <div>
                    <p>Email: {data.email}</p>
                    <p>Name: {data.name}</p>
                    {/* You can display more fields as necessary */}
                </div>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
}
