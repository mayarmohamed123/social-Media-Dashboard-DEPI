import React from "react";
import useUser from "../providers/UserProvider";

const UserIcon = () => {
    const { user } = useUser();
    return (
        <div className="md:hidden">
            <img
                src={user?.picture ?? "./user.jpg"}
                alt=""
                className="size-10 border-2 border-malibu-400 rounded-full p-1 cursor-pointer
                hover:shadow-md object-cover"
            />
        </div>
    );
};

export default UserIcon;
