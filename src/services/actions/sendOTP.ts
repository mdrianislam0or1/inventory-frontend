"use server";

import { SendOTP } from "@/app/send-otp/page";

export const sendOTP = async (formData: SendOTP) => {
    const preparedData = {
        email: formData.email,
    };

    const res = await fetch(`http://127.0.0.1:8000/api/send-otp`, {
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
