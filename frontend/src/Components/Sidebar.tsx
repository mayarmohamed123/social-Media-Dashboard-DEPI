import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiUser } from "react-icons/hi2";
import { GoHomeFill } from "react-icons/go";
import { BsPostcardHeartFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import useUser from "../providers/UserProvider";

export const links = [
    {
        title: "Home",
        path: "/",
        icon: <GoHomeFill />,
    },
    {
        title: "Account",
        path: "/account",
        icon: <HiUser />,
    },
    {
        title: "My Posts",
        path: "/my-posts",
        icon: <BsPostcardHeartFill />,
    },
    {
        title: "Liked",
        path: "/liked",
        icon: <AiFillLike />,
    },
    {
        title: "Logout",
        path: "/logout",
        icon: <IoLogOut />,
    },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    const {user} = useUser()
    return (
        <div className="sticky top-10 w-64 h-full bg-malibu-50 py-16 shadow-md max-md:hidden">
            <div className="flex flex-col items-center">
                <img
                    src={user?.picture?? "./user.jpg"}
                    alt="profile picture"
                    className="w-28 h-28 rounded-full mb-5 border-2 border-malibu-500 flex justify-center
                     object-cover items-center"
                />
                <h3 className="text-2xl font-bold text-primary-900">
                    {user?.full_name}
                </h3>
            </div>

            <nav className="mt-10">
                <ul className="space-y-2">
                    {links.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.path}
                                className={(isActive) =>
                                    `text-lg py-2 px-8 rounded-md text-primary-700 hover:bg-malibu-100
                                    flex items-center gap-x-2 ${
                                        location.pathname === link.path &&
                                        "font-bold underline !text-malibu-600"
                                    }`
                                }
                            >
                                {link.icon}
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
