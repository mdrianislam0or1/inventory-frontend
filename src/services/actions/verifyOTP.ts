"use server";

import { VerifyOTP } from "@/app/verify-otp/page";


export const verifyOTP = async (formData: VerifyOTP) => {
    const preparedData = {
        email: formData.email,
        otp: formData.otp,
    };

    const res = await fetch(`http://127.0.0.1:8000/api/verify-otp`, {
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
