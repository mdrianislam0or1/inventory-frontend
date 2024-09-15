"use server";

export const resetPassword = async (password: string, token: string) => {
    const preparedData = {
        password: password,
    };

    const res = await fetch(`http://127.0.0.1:8000/api/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token, // Pass the token in the header
        },
        body: JSON.stringify(preparedData),
        cache: "no-store",
    });

    const info = await res.json();
    return info;
};
