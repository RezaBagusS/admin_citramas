'use client'

import { FcBusinesswoman } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getUser, invalidateSession } from "@/app/helpers/sessionHelpers";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const route = useRouter();

    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({
        email: ""
    });

    const handleToggle = () => {
        setOpen(prev => !prev);
    }

    const handleLogOut = () => {
        invalidateSession();
        handleToggle();
        route.push("/");
    }

    useEffect(() => {
        const userData = getUser();
        setUserData(userData);
    },[])

    return (
        <nav className="bg-slate-700 flex z-20 justify-between items-center px-7 py-5">
            <p className="text-custWhite text-xl">
                Admin Panel
            </p>
            <div className="relative">
                <FcBusinesswoman onClick={handleToggle} className="text-3xl cursor-pointer text-white" />
                <div className={`absolute z-40 top-10 right-0 rounded-md border drop-shadow-sm bg-white
                    ${open ? "block" : "hidden"}
                `}>
                    <div className="pb-2 pt-1 px-3 pointer-events-none">
                        <span className="text-xs text-gray-400">Info</span>
                        <p className="whitespace-nowrap">
                            {userData.email}
                        </p>
                    </div>
                    <div 
                    onClick={handleLogOut}
                    className="border-t px-3 pt-1 pb-2 hover:bg-slate-200 cursor-pointer">
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;