"use client";

import { sendOTP } from "@/services/actions/sendOTP";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define the interface for the form data
export interface SendOTP {
    email: string;
}

export default function SendOTPPage() {
    // Initialize the form state
    const [formData, setFormData] = useState<SendOTP>({
        email: "",
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
            // Call the backend function to send OTP
            const res = await sendOTP(formData);
            console.log("OTP sent successfully:", res);

            if (res) {
                setSuccess("OTP sent to your email successfully!");
                setError(null); // Clear any existing errors
                // You can redirect to a new page if needed:
                router.push("/verify-otp");

            } else {
                setError(res.message || "Error sending OTP.");
                setSuccess(null); // Clear any success message
            }
        } catch (err) {
            console.error("Error sending OTP:", err);
            setError("Something went wrong, please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-8">Send OTP</h2>
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
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Send OTP
                    </button>
                </form>
            </div>
        </div>
    );
}
