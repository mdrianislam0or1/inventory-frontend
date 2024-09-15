/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Import jwtDecode for token decoding
'use client'
import Navbar from "@/components/Navigation/Navbar/Navbar";
import { userLogin } from "@/services/actions/login";
import Link from "next/link";
import React, { useState } from "react";
import { decodedToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";

export type FormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormValues>({
        email: "rianislam35@gmail.com",
        password: "1234",
    });
    const [errors, setErrors] = useState<Partial<FormValues>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormValues> = {};
        if (!formData.email) {
            newErrors.email = "Username or Email is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await userLogin(formData);
            if (res?.token) {
                // Decode the token to get user info
                const decoded = decodedToken(res.token);

                // Store the token and user info in localStorage
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(decoded));

                // Redirect to dashboard
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                            Login to Your Account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Username or Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="relative block w-full px-3 py-2 my-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Username or Email address"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="relative block w-full px-3 py-2 my-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </div>
                        <div className="text-sm text-center">
                            Don't have an account?
                            <Link
                                href="/register"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign up
                            </Link>
                        </div>
                        <div className="text-sm text-center">
                            Forget Password account?
                            <Link
                                href="/send-otp"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forget Password
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
