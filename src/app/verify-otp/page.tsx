"use client";

import { verifyOTP } from "@/services/actions/verifyOTP";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define the interface for the form data
export interface VerifyOTP {
    email: string;
    otp: string;
}

export default function VerifyOTPPage() {
    // Initialize the form state
    const [formData, setFormData] = useState<VerifyOTP>({
        email: "rianislam35@gmail.com",
        otp: "",
    });

    const [error, setError] = useState<string | null>(null); // To store error messages
    const [success, setSuccess] = useState<string | null>(null); // To show success message

    const router = useRouter();

    // Handle input field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload on submit

        try {
            // Call the backend function to verify OTP
            const res = await verifyOTP(formData);
            console.log("OTP verification result:", res);

            if (res.status === "success") {
                setSuccess("OTP verified successfully!");
                setError(null); // Clear any existing errors

                // Store the token in localStorage
                if (res.token) {
                    localStorage.setItem("resetToken", res.token);
                    console.log("Token stored in localStorage:", res.token);
                }

                // Redirect to reset-password page after successful OTP verification
                router.push("/reset-password");
            } else {
                setError(res.message || "Invalid OTP.");
                setSuccess(null); // Clear any success message
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setError("Something went wrong, please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-8">Verify OTP</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="otp">
                            OTP
                        </label>
                        <input
                            type="text"
                            name="otp"
                            id="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
}
