"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/actions/register";
import Navbar from "@/components/Navigation/Navbar/Navbar";

// Define the interface for the form data
export interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: number | "";
    profilePicture: string;
}

const Register = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        firstName: "test",
        lastName: "tp",
        email: "test@gmail.com",
        password: "1234",
        mobile: 123213213213,
        profilePicture: "https://st.depositphotos.com/1400069/4761/i/450/depositphotos_47618707-stock-photo-girl-profile.jpg",
    });

    const router = useRouter();

    // Handle form input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "mobile" ? Number(value) : value,
        });
    };

    // Handle profile picture upload
    const handleProfilePictureChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formDataToUpdate = new FormData();
            formDataToUpdate.append("image", file);

            try {
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=468a47d5f64ecfb9b135bba4c38d559d`,
                    {
                        method: "POST",
                        body: formDataToUpdate,
                    }
                );
                const data = await response.json();
                if (data.data && data.data.url) {
                    setFormData({
                        ...formData,
                        profilePicture: data.data.url,
                    });
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await register(formData);
            console.log("Registration response:", res);
            if (res) {
                router.push("/dashboard"); // Redirect on success
            } else {
                console.error("Registration error:", res.message);
            }
        } catch (err) {
            console.error("Error during registration:", err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen my-2 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Register to Your Site
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="mobile">
                                Mobile Number
                            </label>
                            <input
                                type="number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="profilePicture">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                name="profilePicture"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="mt-1 block w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-black text-white rounded-md"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
