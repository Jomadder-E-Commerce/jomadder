"use client";
import logo from "/src/assets/logo/logo.png";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import Search from "../search/Search";
import Category from "../Category/Category";
import { IoIosCalculator } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/features/AllSlice/authSlice";
import { useGetwhishListQuery } from "../../Redux/services/wishlistApi/wishlistApi";
import { useGetCartListQuery } from "../../Redux/services/cartApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { BsCart2 } from "react-icons/bs";
import WishlistBadge from "../badge/WishlistBadge";
import CartBadge from "../badge/CartBadge";
import { UserDropdown } from "./UserDropdown";
import { getLocalStorage } from "../LocalStorage/LocalStorage";
import { getDataFromLocalStorage } from "@/utils/localstorage";
import CartModal from "../modal/CartModal";
import WishlistModal from "../modal/WishlistModal";

const MiddleBar = () => {
  const { userRole, user } = useUser();
  // const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const token = getLocalStorage("token");
  const [loading, setLoading] = useState(false);

  const [cart,setCartData] = useState(getDataFromLocalStorage("cart") || []);
  const [wishlist,setWishlistData]=useState(getDataFromLocalStorage("wishlist") || []);
   console.log(cart,wishlist)
  const path = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
    setLoading(false)
    }, 2000);
  };

  const toggleDropdown = (state) => setDropdownOpen(state);

  const showCategory = !path.includes("/all-product/") && !path.includes("/searchImage/");


    const RefreshPage = () => {
      if(window.location.href == "/"){
        window.location.reload()
      }
      else{
        window.location.href = "/";
      }
    }
  return (
    <>

{loading && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70">
          {/* A simple spinner using Tailwind CSS */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      )}
    <div className="bg-gray-100 sticky md:top-0 top-[44px]  z-[200] w-full ">
     <div className="sticky hidden top-0 z-50 md:flex flex-col mb-3 border-b container no-padding border-secondary">
      <div className="w-full container flex items-center justify-between py-0">
        {/* Logo and Category */}
        <div className="flex gap-16 items-center lg:w-[30%]">
          <div onClick={RefreshPage} className="flex items-center cursor-pointer">
            <Image
              unoptimized
              width={80}
              height={80}
              className="2xl:w-[60px] md:w-[50px] sm:w-[40px] w-[40px]"
              src={logo}
              alt="Logo"
            />
          </div>
          {showCategory && <Category />}
        </div>

        {/* Search Bar */}
        <div className="hidden  w-2/5 gap-5 p-2 md:flex">
          <Search />
        </div>
     
        {/* Navigation Icons */}
        <nav className="flex items-center gap-3 lg:w-[30%] justify-end">
          {/* Wishlist */}
         <Link target="_blank" className="flex gap-1 font-semibold items-center text-lg ml-3 text-black" href="/shipping-rate"><IoIosCalculator />Shipping Rate</Link>

          {/* <div className="relative">
            <Link href="/wishlist" className="text-2xl">
              <FaRegHeart className="font-semibold text-primary" />
            </Link>
            <WishlistBadge
              count={wishlist?.length || 0}
              show={wishlist?.length > 0}
            />
          </div> */}
          <WishlistModal/>
            
          {/* Cart */}
          {/* <div className="relative">
            <Link href="/cart" className="text-3xl">
              <BsCart2 className="font-semibold text-primary" />
            </Link>
            <CartBadge
              count={cart.length || 0}
              show={cart.length > 0 }
            />
          </div> */}

          <CartModal/>

          {/* User Dropdown */}
          <div
            // onMouseEnter={() => toggleDropdown(true)}
            // onMouseLeave={() => toggleDropdown(false)}
            onClick={() => toggleDropdown(!dropdownOpen)}
            onMouseLeave={() => toggleDropdown(false)}
            className="relative mt-2"
          >
            <button className="p-4 -m-4">
              {user?.photoURL ? (
                <Image
                  src={user?.photoURL}
                  alt="User"
                  height={20}
                  width={20}
                  className="rounded-full text-primary size-6"
                  priority
                />
              ) : (
                <FaUserCircle className="text-primary size-6" />
              )}
            </button>
            <UserDropdown dropdownOpen={dropdownOpen} handleLogout={handleLogout} token={token} userRole={userRole} />
          </div>
        </nav>
      </div>

     </div>
    </div>

    <div className=" w-full gap-5 py-1 md:hidden container sticky top-[46px] z-[40] bg-white">
          <Search />
        </div>
    </>
    
  );
};

export default MiddleBar;
