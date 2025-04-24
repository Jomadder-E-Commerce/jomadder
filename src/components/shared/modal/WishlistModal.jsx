"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "@/utils/localstorage";
import { X } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import WishlistBadge from "../badge/WishlistBadge";
import Wishlist from "@/components/shared/dashboard/Wishlist/Wishlist";
import { AnimatePresence, motion } from "framer-motion";
import Drawer from "react-modern-drawer";
import useWishlist from "@/hooks/useWishlist";

const WishlistModal = () => {
  const { wishlist, AddIntoWishlist, RemoveFromWishlist } = useWishlist();
  const [openModal, setOpenModal] = useState(false);
  const [drawerSize, setDrawerSize] = useState(3005); // Default to smaller size

  // Handle window resize for responsive drawer size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Match the same breakpoint as CartModal
        setDrawerSize(5000);
      } else {
        setDrawerSize(30005);
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setOpenModal((prevState) => !prevState);

  const GoOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div>
        {/* Wishlist Button */}
        <div className="md:block hidden relative ">
          <div
            onClick={GoOpenModal}
            className="text-2xl cursor-pointer md:flex hidden "
          >
            <FaRegHeart className="font-semibold text-primary" />
          </div>
          <WishlistBadge count={wishlist?.length} show={wishlist?.length} />
        </div>
        <div className="md:hidden flex flex-col items-center relative ">
          <div onClick={GoOpenModal}>
            <FaRegHeart className="md:text-2xl text-lg" />
            {wishlist?.length ? (
              <span className="absolute -top-1 right-0 text-white text-center h-4 font-medium bg-red-500 rounded-full  px-1 text-xs">
                {wishlist?.length >= 10 ? "9+" : wishlist?.length}
              </span>
            ) : (
              ""
            )}
          </div>
          <h3 className="text-[11px] font-medium">Wishlist</h3>
        </div>
      </div>

      <Drawer
        open={openModal}
        onClose={toggleDrawer}
        direction="right"
        size={"80%"}
        style={{ zIndex: 9999999 }} // Ensure drawer is on top
        
      >
        <div className="flex h-full w-full flex-col justify-between bg-white pb-10 drop-shadow-sm overflow-y-auto ">
          <X
            onClick={() => {
              setOpenModal(false);
            }}
            className="absolute top-5 left-8 cursor-pointer text-black"
          />
          <div className="mt-8">
            <Wishlist setOpenModal={setOpenModal} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default WishlistModal;
