"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/actions/resetPassword";

// Interface for form data
export interface ResetPasswordForm {
    password: string;
}

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState<ResetPasswordForm>({
        password: "",
    });

    const [error, setError] = useState<string | null>(null); // Store error messages
    const [success, setSuccess] = useState<string | null>(null); // Store success message

    const router = useRouter();

    // Handle input field change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from reloading the page

        const token = localStorage.getItem("resetToken"); // Assuming token is stored in localStorage after OTP verification

        if (!token) {
            setError("No token found. Please verify OTP again.");
            return;
        }

        try {
            const res = await resetPassword(formData.password, token);
            console.log("Password reset response:", res);

            if (res.status === "success") {
                setSuccess("Password reset successfully!");
                setError(null); // Clear errors
                // Optionally, redirect to login page or dashboard after successful password reset
                router.push("/login");
            } else {
                setError(res.message || "Password reset failed.");
                setSuccess(null); // Clear success message
            }
        } catch (err) {
            console.error("Error resetting password:", err);
            setError("Something went wrong, please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-8">Reset Password</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
