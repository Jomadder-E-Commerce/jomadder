"use client";
import { FaFileContract, FaHome, FaRegHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/AllSlice/authSlice";
import logo from "/src/assets/logo/logo2.png";
import Image from "next/image";
import { useGetCartListQuery } from "../Redux/services/cartApi";
import { useGetwhishListQuery } from "../Redux/services/wishlistApi/wishlistApi";
import WishlistBadge from "./badge/WishlistBadge";
import CartBadge from "./badge/CartBadge";
import { MdOutlineSpaceDashboard, MdPhone } from "react-icons/md";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SideDrawer from "./SideDrawer";
import { IoIosCall } from "react-icons/io";
import { getLocalStorage } from "./LocalStorage/LocalStorage";
import { getDataFromLocalStorage } from "@/utils/localstorage";
import WishlistModal from "./modal/WishlistModal";
import CartModal from "./modal/CartModal";
import SpeedDial from "../pages/homePage/SpeedDial";

const MobileNavbar = () => {
  const { userRole, user } = useUser();
  const token = getLocalStorage("token");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [cart, setCartData] = useState(getDataFromLocalStorage("cart") || []);
  const [wishlist, setWishlistData] = useState(getDataFromLocalStorage("wishlist") || []);

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const RefreshPage = () => {
    if (window.location.href == "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };


  console.log("hello data")
  return (
    <div className="relative ">
      {/* Bottom Fixed Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[40] flex justify-between items-center text-primary bg-white shadow-md border-t py-2 px-4">
        {/* Left Side: Category and Wishlist */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <SideDrawer />
            <h3 className="text-[11px] font-medium">Category</h3>
          </div>

          {/* <div className="relative flex flex-col items-center">
            <Link href="/wishlist">
              <FaRegHeart className="text-lg md:text-2xl" />
              <span className="absolute h-4 px-1 text-xs font-medium text-center text-white bg-red-500 rounded-full -top-1 -right-0">
                {wishlist?.length}
              </span>
            </Link>
            <h3 className="text-[11px] font-medium">Wishlist</h3>
          </div> */}
          <WishlistModal />
        </div>

        {/* Center Logo */}
        <div
          onClick={RefreshPage}
          className="absolute  transform -translate-x-1/2 bg-white rounded-full shadow-lg left-1/2 -top-6 p-1"
        >
          <Image
            unoptimized
            src={logo}
            height={70}
            width={70}
            alt="Logo"
            className=" xsm:size-[70px] size-[50px]"
          />
        </div>

        {/* Right Side: Cart and Profile */}
        <div className="flex items-center gap-4">
          {/* <div className="flex flex-col items-center  w-[80px] ">
            <Link href="/cart" className="relative">
              <BsCart2 className="text-lg md:text-2xl" />
              <span className="absolute h-4 px-1 text-xs font-medium text-center text-white bg-red-500 rounded-full -top-1 -right-3">
                {cart?.length}
              </span>
            </Link>
            <h3 className="text-[11px] font-medium">Cart</h3>
          </div> */}
          <CartModal />

          <div className="fixed md:bottom-4 bottom-12 md:right-12 right-9">
            <SpeedDial className='' />
            {/* <SpeedDialPortal/> */}
          </div>

          <button onClick={toggleDrawer} className="flex flex-col items-center invisible">
            <GoPerson className="text-2xl" />
            <h3 className="text-[11px] font-medium">Profile</h3>
          </button>
        </div>
      </div>

      {/* Drawer Component */}
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" className="p-4">
        <div className="flex flex-col gap-4">
          {token ? (
            <Link href={"/profile"} className="flex items-center gap-2 hover:text-primary">
              <GoPerson /> My Profile
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2">
              <GoPerson /> Sign In
            </Link>
          )}
          {token && (
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-primary">
              <MdOutlineSpaceDashboard /> Dashboard
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

export default MobileNavbar;