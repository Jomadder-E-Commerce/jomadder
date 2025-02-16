"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/AllSlice/authSlice";
import useUser from "@/hooks/useUser";
import { HiOutlinePhone } from "react-icons/hi";
import { FaLocationDot, FaFacebook } from "react-icons/fa6";
import Image from "next/image";
import { useGetCartListQuery } from "../Redux/services/cartApi";
import { useGetwhishListQuery } from "../Redux/services/wishlistApi/wishlistApi";
import WishlistBadge from "./badge/WishlistBadge";
import { BsCart2 } from "react-icons/bs";
import CartBadge from "./badge/CartBadge";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import  Drawer  from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "/src/assets/logo/logo.png";
import { UserDropdown } from "./middlebar/UserDropdown";

const TopBar = () => {
  const { userRole = "", user = {} } = useUser();
  const token = useSelector((state) => state.auth?.token || null);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: cartData } = useGetCartListQuery(undefined, { skip: !token });
  const { data: wishlist } = useGetwhishListQuery(undefined, { skip: !token });

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
    setLoading(false)
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const RefreshPage = () => {
    if(window.location.href == "/"){
      window.location.reload()
    }
    else{
      window.location.href = "/";
    }
  }
  const toggleDropdown = (state) => setDropdownOpen(state);
  return (
    <>
    {loading && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70">
          {/* A simple spinner using Tailwind CSS */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      )}
     <div className="bg-primary md:relative sticky top-0 z-50 ">
    <div className="z-50 w-full md:py-3  md:bg-primary  text-primary border-b-2 md:border-none border-primary container no-padding">
      <div className="md:flex hidden items-center  justify-between gap-4 container no-padding">
        <p className="block text-sm text-white">
          Welcome to Jomadder International, Explore your best experience
        </p>

        
        <div className=" items-center justify-end text-sm flex  text-white">
          <nav className="flex items-center gap-5">
            {/* location  */}
            <div className="">
              <a
                href={"https://www.facebook.com/parceltradeinternational"}
                target="_blank"
                className="flex items-center justify-center gap-2 text-3xl"
              >
                <FaFacebook className="text-xl" />

                {/* <span className="text-sm ">Facebook</span> */}
              </a>
            </div>
            <div className="">
              <a
                href={"https://maps.app.goo.gl/MpXteDUXfgAVzscQ6"}
                target="_blank"
                className="flex items-center justify-center gap-2 text-3xl"
              >
                <FaLocationDot className="text-xl" />

                {/* <span className="text-sm ">Natunbazar, Gulshan 2</span> */}
              </a>
            </div>
            {/* contact number */}
            <div className="">
              <Link
                href={"tel:8801767559231"}
                className="flex items-center justify-center gap-2 text-3xl"
              >
                <HiOutlinePhone className="text-xl" />

                <span className="text-sm ">+8801767559231</span>
              </Link>
            </div>

            <Link href={"/contact-us"} className="hidden whitespace-nowrap md:block">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-between container w-full md:hidden ">
        <div onClick={RefreshPage}> <Image
            unoptimized
            width={60}
            height={60}
            className="w-[40px] sm:w-[50px]"
            src={logo}
            alt="Logo"
          /></div>
         
          <div className="flex gap-4 items-center ">
            <Link  className="text-white" href="tel:8801767559231" >
              <FaPhoneVolume className="text-lg text-white" />
            </Link>
              <div
                        // onMouseEnter={() => toggleDropdown(true)}
                        // onMouseLeave={() => toggleDropdown(false)}
                        onClick={() => toggleDropdown(!dropdownOpen)}
                        onMouseLeave={() => toggleDropdown(false)}
                        className="relative "
                      >
                      
                          {user?.photoURL ? (
                            <Image
                              src={user?.photoURL}
                              alt="User"
                              height={20}
                              width={20}
                              className="rounded-full text-white size-5"
                              priority
                            />
                          ) : (
                            <FaUserCircle className="text-white size-5" />
                          )}
                    
                        <UserDropdown dropdownOpen={dropdownOpen} handleLogout={handleLogout} token={token} userRole={userRole} />
                      </div>
          </div>
        </div>
    </div>
            <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" className="p-4">
              <div className="flex flex-col gap-4">
                {token && 
                  <Link href="/profile/dashboard" className="flex items-center gap-2">
                    <MdOutlineSpaceDashboard /> Dashboard
                  </Link>
                }
                {token ? (
                  <Link
                    href={"/profile"}
                    className="flex items-center gap-2"
                  >
                    <FaUserCircle /> My Profile
                  </Link>
                ) : (
                  <Link href="/login" className="flex items-center gap-2">
                    <FaUserCircle />   Sign In
                   
                  </Link>
                )}
                {token && (
                  <div onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                    <CiLogout /> Logout
                  </div>
                )}
              </div>
            </Drawer>
    </div>
    </>
   

  );
};

export default TopBar;
