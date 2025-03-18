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
import Drawer from 'react-modern-drawer';
import useCart from '@/hooks/useCart';
import WishlistBadge from '../badge/WishlistBadge';

const CartModal = () => {
  const { cart, AddIntocart, RemoveFromcart, removeAllcart } = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [drawerSize, setDrawerSize] = useState(305); // Default to smaller size

  // Handle window resize for responsive drawer size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Adjust breakpoint as needed
        setDrawerSize(500);
      } else {
        setDrawerSize(280);
      }
    };

    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => setOpenModal((prevState) => !prevState);

  const GoOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      {/* Cart Button */}
      <div className="md:block hidden relative ">
        <div onClick={GoOpenModal} className="text-3xl cursor-pointer md:flex hidden">
          <BsCart2 className="font-semibold text-primary" />
        </div>
        <WishlistBadge count={cart?.length} show={cart?.length} />
      </div>
      <div className="md:hidden flex flex-col items-center w-[80px] relative -right-5">
        <div onClick={GoOpenModal} className="relative">
          <BsCart2 className="md:text-2xl text-lg" />
          <span className="absolute -top-2 left-[26%] sm:left-[28%] md:left-[65%] text-white text-center h-4 font-medium bg-red-500 rounded-full px-1 text-xs">
            {cart?.length}
          </span>
        </div>
        <h3 className="text-[11px] font-medium">Cart</h3>
      </div>

      <Drawer
        open={openModal}
        onClose={toggleDrawer}
        direction="right"
        size={drawerSize}
        style={{ zIndex: 9999 }} // Ensure drawer is on top
      >
        <div className="flex bg-white z-50 h-full w-full flex-col justify-between pb-10 drop-shadow-sm overflow-y-auto">
          <X
            onClick={() => { setOpenModal(false) }}
            className='absolute top-5 right-3 cursor-pointer text-black'
          />
          <div className="mt-8">
            <CartPage setOpenModal={setOpenModal} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartModal;