import axios from "../api/axiosInstance";
import endpoints from "../api/endpoints";

export const logout = async () => {
    try {
        const response = await axios.post(endpoints.logout);
        localStorage.removeItem("user");
        return response.data;
    } catch (error) {
        console.log("Logout failed!");
        throw error;
    }
};

export const checkAuth: () => Promise<boolean> = async () => {
    try {
        const response = await axios.get(endpoints.api_auth);
        localStorage.setItem("user", JSON.stringify(response.data));
        return true;
    } catch (error) {
        return false;
    }
};
