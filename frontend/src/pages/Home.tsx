import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useMatch, Navigate } from "react-router-dom";
import Posts from "./Posts";
import NavBar from "../Components/NavBar";
import People from "../Components/People";
import Loading from "../Components/Loading";
import { UserProvider } from "../providers/UserProvider";
import { checkAuth } from "../utils";
import { NotificationProvider } from "../providers/NotificationProvider";

const Home = () => {
    const isHome = useMatch("/");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [fetchError, setFetchError] = React.useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] =
        React.useState<boolean>(false);

    const getUserData = () => {
        checkAuth()
            .then((response) => {
                setIsAuthenticated(true);
            })
            .catch((error) => {
                if (error.response.status !== 401) {
                    setFetchError(true);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    React.useEffect(() => {
        getUserData();
    }, []);

    if (loading) return <Loading />;
    if (fetchError) {
        return (
            <p className="font-bold text-red-600 text-lg h-lvh flex justify-center items-center">
                Error occured while loading data!
            </p>
        );
    }

    return isAuthenticated ? (
        <>
            <UserProvider>
                <NotificationProvider>
                    <NavBar />
                    <div className="flex py-8 px-6 md:px-6 lg:px-10">
                        <Sidebar />
                        <div className="flex-1">
                            {isHome ? <Posts type="Feed" /> : <Outlet />}
                        </div>
                        <div className="max-lg:hidden">
                            <People />
                        </div>
                    </div>
                </NotificationProvider>
            </UserProvider>
        </>
    ) : (
        <Navigate to={"/"} />
    );
};

export default Home;
