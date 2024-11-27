import { FC, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { links } from "./Sidebar";
import NavSearch from "./NavSearch";

const NavMenu: FC<{ menuOpen: boolean; setMenuOpen: Function }> = ({
    menuOpen,
    setMenuOpen,
}) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (menuRef.current) {
            if (menuOpen) {
                menuRef.current.style.height =
                    menuRef.current.scrollHeight + "px";
            } else {
                menuRef.current.style.height = "0";
            }
        }
    }, [menuOpen]);

    return (
        <div
            id="nav-menu"
            ref={menuRef}
            className="absolute z-50 top-full right-0 w-full bg-malibu-50 overflow-hidden md:hidden border-b-8 
            border-malibu-600"
        >
            <div className="sm:hidden mx-auto my-3 w-4/5">
                <NavSearch />
            </div>
            <ul className="w-full flex flex-col gap-y-2 my-5">
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink
                            onClick={() => {
                                setMenuOpen(false);
                            }}
                            to={link.path}
                            className={(isActive) =>
                                `text-lg py-2 px-8 rounded-md text-primary-700 hover:bg-malibu-200
                                    flex items-center gap-x-2 ${
                                        location.pathname === link.path &&
                                        "font-bold bg-malibu-200 !text-malibu-600"
                                    }`
                            }
                        >
                            {link.icon}
                            {link.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavMenu;
