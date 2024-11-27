import { Spinner } from "flowbite-react";
import React from "react";

const Loading = () => {
    return (
        <div className="text-center h-lvh flex items-center justify-center">
            <Spinner className="fill-malibu-500" size="xl" />
        </div>
    );
};

export default Loading;
