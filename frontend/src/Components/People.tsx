import React from "react";
import { type User } from "../types/users";

const people: User[] = [
    {
        url: "http://127.0.0.1:8000/api/users/users/1/",
        first_name: "Ahmed",
        last_name: "Hatem",
        email: "ahmed@a.com",
        phone: "",
        is_active: true,
        picture: "http://127.0.0.1:8000/media/users/pictures/logo512.png",
        full_name: "Ahmed Hatem",
    },
    {
        url: "http://127.0.0.1:8000/api/users/users/1/",
        first_name: "Ahmed",
        last_name: "Hatem",
        email: "ahmed@a.com",
        phone: "",
        is_active: true,
        picture: "http://127.0.0.1:8000/media/users/pictures/logo512.png",
        full_name: "Ahmed Hatem",
    },
    {
        url: "http://127.0.0.1:8000/api/users/users/1/",
        first_name: "Ahmed",
        last_name: "Hatem",
        email: "ahmed@a.com",
        phone: "",
        is_active: true,
        picture: "http://127.0.0.1:8000/media/users/pictures/logo512.png",
        full_name: "Ahmed Hatem",
    },
    {
        url: "http://127.0.0.1:8000/api/users/users/1/",
        first_name: "Ahmed",
        last_name: "Hatem",
        email: "ahmed@a.com",
        phone: "",
        is_active: true,
        picture: "http://127.0.0.1:8000/media/users/pictures/logo512.png",
        full_name: "Ahmed Hatem",
    },
];

const People = () => {
    return (
        <div className="sticky top-10 w-64 bg-malibu-50 px-3 py-6 shadow-md">
            <h1 className="font-bold">People you may know:</h1>
            <div className="suggestions flex flex-col gap-y-6 pt-5">
                {people.map((person, index) => (
                    <div key={index} className="flex gap-x-2 items-center">
                        <div className="img">
                            <img
                                src={person.picture}
                                alt={person.full_name}
                                className="size-10 rounded-full"
                            />
                        </div>
                        <div className="name">
                            <span className="font-bold">
                                {person.full_name}
                            </span>
                            <br />
                            <span className="text-sm text-gray-400">
                                1 mutual friend
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
