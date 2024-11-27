import React from "react";
import Button from "../Components/CommonComponent/Button";
import axios from "../api/axiosInstance";
import endpoints from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils";

const Logout = () => {
    const [post, setPost] = React.useState<boolean>(false);
    const [fetchError, setFetchError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        setPost(true);
        setFetchError(null);
        logout()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                setFetchError("Unexpected error happened!  Please try again.");
            })
            .finally(() => {
                setPost(false);
            });
    };

    return (
        <div className="md:px-8 lg:px-10 lg:w-4/5">
            <h1 className="font-bold text-xl">Are you sure you want logout?</h1>

            <div className="mt-4">
                <Button
                    isProcessing={post}
                    label="Logout"
                    className="border-2 bg-malibu-600 text-white font-bold hover:bg-malibu-500"
                    onClick={handleLogout}
                />
            </div>
            {true && (
                <p className="ms-2 font-bold text-red-600 mt-2">{fetchError}</p>
            )}
        </div>
    );
};

export default Logout;
