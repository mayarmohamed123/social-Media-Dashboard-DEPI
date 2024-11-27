import { type RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PostPage from "./pages/PostPage";
import Account from "./pages/Account";
import Posts from "./pages/Posts";
import Logout from "./pages/Logout";

export type TitledRouteObject = RouteObject & {
    title?: string;
    children?: TitledRouteObject[];
};

export const routes: TitledRouteObject[] = [
    {
        path: "/",
        title: "home",
        element: <Home />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/account",
                title: "account",
                element: <Account />,
            },
            {
                path: "/my-posts",
                title: "my posts",
                element: <Posts type="My Posts" />,
            },
            {
                path: "/liked",
                title: "liked posts",
                element: <Posts type="Liked Posts" />,
            },
            {
                path: "/post/:postId",
                title: "post",
                element: <PostPage />,
            },
            {
                path: "/logout",
                title: "logout",
                element: <Logout />,
            },
        ],
    },
    {
        path: "/login",
        title: "login",
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        path: "/signup",
        title: "signup",
        element: <SignUp />,
        errorElement: <NotFound />,
    },
] as TitledRouteObject[];
