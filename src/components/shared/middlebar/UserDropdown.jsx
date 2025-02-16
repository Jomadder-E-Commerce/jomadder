import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const UserDropdown = ({
  dropdownOpen,
  token,
  userRole,
  handleLogout,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted on the client to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering on the server
  }

  return (
    <div
      className={`absolute top-8 right-0 z-50 px-3 pb-3 pt-3 space-y-1 w-fit min-w-[170px] shadow-md bg-white text-primary border rounded-sm
      transform transition-all duration-300 ease-in-out
      ${dropdownOpen
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-5 opacity-0 scale-95 pointer-events-none"
        }`}
    >
      {token &&
        <Link href="/profile/dashboard" className="flex items-center gap-2">
          <MdOutlineSpaceDashboard className="text-xl" /> Dashboard
        </Link>
      }


      
      <Link
        href={token ?
          "/profile"
          : "/login"
        }
        className="flex items-center gap-2"
      >
        <GoPerson className="text-xl" /> {token ? "My Profile" : "Sign In"}
      </Link>
      {token && (
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-2 text-left cursor-pointer"
        >
          <CiLogout /> Logout
        </button>
      )}
    </div>
  );
};
