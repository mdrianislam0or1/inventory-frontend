"use server";
import { RegisterForm } from "@/app/register/page";

export const register = async (formData: RegisterForm) => {
    const preparedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        profilePicture: formData.profilePicture,
    };

    const res = await fetch(`http://127.0.0.1:8000/api/user-registration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
        cache: "no-store",
    });

    const info = await res.json();
    return info;
};
