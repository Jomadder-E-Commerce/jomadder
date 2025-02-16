"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BsCart2 } from 'react-icons/bs';
import CartBadge from '../badge/CartBadge';
import { getDataFromLocalStorage } from '@/utils/localstorage';
import CartPage from '@/components/pages/cart/CartPage';
import { X } from 'lucide-react';
import WishlistModal from './WishlistModal';
import { AnimatePresence, motion } from 'framer-motion';
import  Drawer  from 'react-modern-drawer';

const CartModal = () => {
  const [cart, setCartData] = useState(getDataFromLocalStorage("cart") || []);
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
      {/* Cart Button */}
      <div className="md:block hidden relative ">
        <div onClick={() => setOpenModal(true)} className="text-3xl cursor-pointer md:flex hidden">
          <BsCart2 className="font-semibold text-primary" />
        </div>
        <CartBadge count={cart.length || 0} show={cart.length > 0} />
      </div>
      <div className="md:hidden flex flex-col items-center w-[80px] relative -right-5">
        <div onClick={() => setOpenModal(true)} className="relative">
          <BsCart2 className="md:text-2xl text-lg" />
          <span className="absolute -top-1 -right-3 text-white text-center h-4 font-medium bg-red-500 rounded-full px-1 text-xs">
            {cart?.length}
          </span>
        </div>
        <h3 className="text-[11px] font-medium">Cart</h3>
      </div>

      {/* Animate the modal with AnimatePresence */}
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
          <CartPage setData={setCartData} data={cart} setOpenModal={setOpenModal} />    
            </div>
          
          </div>
        
        </Drawer>
    </>
  );
};

export default CartModal;
