/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

export const storeUserInfo = ({ accessToken }: {
    accessToken: string
}) => {
    console.log(accessToken);
    return setToLocalStorage(authKey, accessToken)
};


export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedData: any = decodedToken(authToken);
        console.log("decodedData", decodedData);
        return {
            ...decodedData,
        };
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        return !!authToken;
    }
}

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
}