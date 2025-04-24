import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import useUser from "@/hooks/useUser";
import { getLocalStorage } from "../LocalStorage/LocalStorage";
import { isObject } from "lodash";
import ProfileData from "@/lib/ProfileNavData";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export const UserDropdown = ({
  dropdownOpen,
  // user,
  // userRole,
  handleLogout,
}) => {
  const [user, setUser] = useState(null);

  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted on the client to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const user = getLocalStorage("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser?.user || parsedUser);
    } else {
      setUser(null);
    }
  }, [dropdownOpen]);

  if (!isMounted) {
    return null; // Prevent rendering on the server
  }

  return (
    // <div
    //   className={`absolute top-8 right-0 z-50 px-3 pb-3 pt-3 space-y-1 w-fit min-w-[170px] shadow-md bg-white text-primary border rounded-sm
    //   transform transition-all duration-300 ease-in-out
    //   ${
    //     dropdownOpen
    //       ? "translate-y-0 opacity-100 scale-100"
    //       : "-translate-y-5 opacity-0 scale-95 pointer-events-none"
    //   }`}
    // >
    //   {/* {user && (
    //     <Link href="/profile/dashboard" className="flex items-center gap-2">
    //       <MdOutlineSpaceDashboard className="text-xl" /> Dashboard
    //     </Link>
    //   )} */}
    //   {user && ProfileData &&
    //     ProfileData?.map((item, i) => (
    //       <Link href={item.route} className="flex items-center gap-2" key={i}>
    //         <span className="text-xl">{item.icon}</span> {item.name}
    //       </Link>
    //     ))}

    //   <Link
    //     href={user ? "/profile" : "/login"}
    //     className="flex items-center gap-2"
    //   >
    //     <GoPerson className="text-xl" /> {user ? "My Profile" : "Sign In"}
    //   </Link>
    //   {user && (
    //     <button
    //       onClick={handleLogout}
    //       className="flex items-center w-full gap-2 text-left cursor-pointer"
    //     >
    //       <CiLogout /> Logout
    //     </button>
    //   )}
    // </div>
    <div
      className={`absolute top-8 right-0 z-50 p-3 space-y-2 w-fit min-w-[260px] shadow-lg bg-white rounded-lg
        transform transition duration-300 ease-in-out
        ${
          dropdownOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-5 opacity-0 scale-95 pointer-events-none"
        }`}
    >
      {user && (
        <div className=" divide-y-2 divide-y-reverse">
          {/* <img
            src="path_to_your_profile_image"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-primary"
          /> */}
          <p className="text-base text-gray-600">Welcome to Jomadder</p>
          <Link href={"/profile"} className="flex items-center space-x-3 py-2">
            {user?.photoURL ? (
              <Image
                src={user?.photoURL}
                alt="User"
                height={40}
                width={40}
                className="rounded-full text-primary size-10"
                priority
              />
            ) : (
              <FaUserCircle className="text-primary size-10" />
            )}
            <h3 className="font-semibold text-primary">{user.name}</h3>
          </Link>
        </div>
      )}

      {ProfileData &&
        ProfileData.map((item, i) => (
          <Link
            href={item.route}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            key={i}
          >
            <span className="text-xl">{item.icon}</span> {item.name}
          </Link>
        ))}

      {/* <Link
        href={user ? "/profile" : "/login"}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
      >
        <GoPerson className="text-xl" /> {user ? "My Profile" : "Sign In"}
      </Link> */}

      {user && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 w-full text-left cursor-pointer rounded-md hover:bg-gray-100"
        >
          <CiLogout /> Logout
        </button>
      )}
    </div>
  );
};
