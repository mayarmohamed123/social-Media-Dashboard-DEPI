import React, { ReactEventHandler } from "react";
import { RiMessage3Fill, RiNotification4Fill } from "react-icons/ri";
import UserIcon from "./UserIcon";
import NavSearch from "./NavSearch";
import NavMenu from "./NavMenu";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    // handles onscreen clicks
    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                !document
                    .getElementById("nav-menu")
                    ?.contains(event.target as Node) &&
                !document
                    .getElementById("user-icon")
                    ?.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.body.addEventListener("click", handleClick);

        return () => {
            document.body.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <nav
            className="bg-malibu-100 h-20 py-2 px-5 md:px-10
        flex items-center justify-between relative"
        >
            <div className="left flex gap-x-6 items-center">
                <h1 className="font-bold text-xl text-malibu-900">
                    Social Media
                </h1>
                <div className="max-sm:hidden">
                    <NavSearch />
                </div>
            </div>

            <div className="icons flex items-center text-3xl gap-x-4 text-malibu-600">
                <RiMessage3Fill className="cursor-pointer hover:text-malibu-700" />
                <RiNotification4Fill className="cursor-pointer hover:text-malibu-700" />
                <button
                    id="user-icon"
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                >
                    <UserIcon />
                </button>
                <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
        </nav>
    );
};

export default NavBar;
