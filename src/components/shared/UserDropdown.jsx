"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Drawer } from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/AllSlice/authSlice";
import useUser from "@/hooks/useUser";

const UserDropdown = () => {
  const { userRole, user } = useUser();
  const token = useSelector((state) => state.auth.token);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="flex flex-col items-center text-primary "
      >
        <GoPerson className="text-xl" />
      </button>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        className="p-4"
      >
        {/* Drawer Content */}
        <div className="space-y-4">
          {token && (userRole === "admin" || userRole === "moderator") && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MdOutlineSpaceDashboard /> Dashboard
            </Link>
          )}
          {token ? (
            <Link
              href={userRole === "admin" ? "/dashboard/profile" : "/profile"}
              className="flex items-center gap-2 hover:text-primary"
            >
              <GoPerson /> My Profile
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2">
              <GoPerson /> Sign In
            </Link>
          )}
          {token && (
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer hover:text-red-500"
            >
              <CiLogout /> Logout
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default UserDropdown;
