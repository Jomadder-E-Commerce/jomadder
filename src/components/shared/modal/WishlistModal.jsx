"use client"
import React from 'react';
import {useState , useEffect} from "react";
import { getDataFromLocalStorage } from '@/utils/localstorage';
import { X } from 'lucide-react';
import { FaRegHeart } from 'react-icons/fa';
import WishlistBadge from '../badge/WishlistBadge';
import  Wishlist  from '@/components/shared/dashboard/Wishlist/Wishlist';
import { AnimatePresence, motion } from 'framer-motion';
import Drawer from "react-modern-drawer";
const WishlistModal = () => {
    const [wishlist,setWishlistData]=useState(getDataFromLocalStorage("wishlist") || []);
    const [openModal, setOpenModal] = useState(false);
    // useEffect(() => {
    //     if (openModal) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflowY = 'auto';
    //     }

    //     setWishlistData(getDataFromLocalStorage("wishlist") || [])
    //     //  document.body.style.overflow = 'auto';
    // }, [openModal]);
    const toggleDrawer = ()=> setOpenModal((prevState) => !prevState);
    return (
        <>
        {/* Pay Button */}
        <div className="md:block hidden relative">
            <div onClick={() => setOpenModal(true)} className="text-2xl cursor-pointer md:flex hidden ">
               <FaRegHeart className="font-semibold text-primary" />
            </div>
            <WishlistBadge
              count={wishlist.length || 0}
              show={wishlist.length > 0 }
            />
          </div>
          <div className="md:hidden flex flex-col items-center relative ">
            <div onClick={() => setOpenModal(true)}>
              <FaRegHeart className="md:text-2xl text-lg" />
              <span className="absolute -top-1 -right-0 text-white text-center h-4 font-medium bg-red-500 rounded-full px-1 text-xs">
                {wishlist?.length}
              </span>
            </div>
            <h3 className="text-[11px] font-medium">Wishlist</h3>
          </div>
          <Drawer
          open={openModal}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
          size="310px"
        >
          <div className="flex h-full w-full flex-col justify-between bg-white pb-10 drop-shadow-sm overflow-y-auto ">
            <X onClick={()=>{setOpenModal(false)}} className='absolute top-5 right-3 cursor-pointer text-black'/>
            <div className="mt-8">
          <Wishlist setData={setWishlistData} data={wishlist} setOpenModal={setOpenModal} />    
            </div>
          
          </div>
        
        </Drawer>
        </>
    );
};

export default WishlistModal;