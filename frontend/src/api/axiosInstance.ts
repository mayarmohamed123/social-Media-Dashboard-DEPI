import defaultAxios from "axios";
import { logout } from "../utils";

// Utility function to get cookies
export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
};

const axios = defaultAxios.create({
    withCredentials: true,
    headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        "Content-Type": "application/json",
    },
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error);
        if (
            error.response.status === 401 &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/signup"
        ) {
            
            logout()
                .then(() => {
                    console.log("logged out");
                })
                .catch((error) => {
                    console.log("error logging out!");
                })
                .finally(() => {
                    window.location.href = "/login";
                });
        }
        return Promise.reject(error);
    }
);

export default axios;
