/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormValues } from "@/app/login/page";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FormValues) => {
    const response = await fetch('http://127.0.0.1:8000/api/user-login',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: 'no-store',
            credentials: 'include',
        }
    );
    const result = await response.json();
    console.log('Here', result?.token);
    if (result?.token) {
        setAccessToken(result?.token, {
            redirect: "/dashboard",
        });
    }

    return result;
}
