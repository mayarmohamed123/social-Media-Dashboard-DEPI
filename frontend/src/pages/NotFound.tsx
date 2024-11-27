import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-lvh">
            <div className="text-center p-10 font-bold text-2xl text-red-600">
                Page Not Found
            </div>
            <Link
                to={"/"}
                className="p-6 h-8 bg-malibu-400 flex items-center justify-center rounded-xl text-white border-2
            border-malibu-400 hover:bg-transparent hover:text-malibu-400"
            >
                Home
            </Link>
        </div>
    );
};

export default NotFound;
