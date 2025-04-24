'use client'

import React, { useState } from 'react';
import watch from '@/assets/dashboard/bag.jpg';
import WishlistModal from './WishlistModal';
import WishlistItem from './WishlistItem';
import { CiShoppingCart } from "react-icons/ci";
import { useDeleteWhishlistAllMutation, useDeleteWhishlistSingleMutation, useGetwhishListQuery } from '@/components/Redux/services/wishlistApi/wishlistApi';
import { toast } from 'react-toastify';
import SkeletonDashWishlist from '@/components/all-skeleton/wishlistSkeleton/WishlistSkeleton';
import { useRouter } from 'next/navigation';
import { getDataFromLocalStorage, removeDataFromLocalStorage, removeOneDataFromLocalStorage } from '@/utils/localstorage';
import useWishlist from '@/hooks/useWishlist';




const Wishlist = ({setOpenModal}) => {
    const {wishlist, AddIntoWishlist, RemoveFromWishlist,removeAllWishlist} = useWishlist()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const [data,setData]=useState(getDataFromLocalStorage("wishlist") || []);
    const [deleteWhishlistSingle] = useDeleteWhishlistSingleMutation(); 
    const [deleteWhishlistAll] = useDeleteWhishlistAllMutation(); 

    const handleRemoveClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };
    // console.log(data)
    const handleConfirmRemove = async () => {
        console.log(selectedProduct)
        if (selectedProduct) {
            try {
                // removeOneDataFromLocalStorage("wishlist",selectedProduct.id);
                RemoveFromWishlist(selectedProduct.id);
                    setSelectedProduct(null);
                    toast.success("Product successfully removed from your wishlist.")
                    // setData(getDataFromLocalStorage("wishlist") || [])
                
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
        setIsModalOpen(false);
    };
    const handleDeletedall = async()=>{
        if(wishlist.length==0){
            toast.info("Your wishlist is empty");
            return
        }
        removeAllWishlist()
        
            toast.success(`All Product successfully removed from your wishlist.`)
        //   setData([])
    }
    // if(isLoading){
    //     return <SkeletonDashWishlist/>
    // }
    
    const SeeDetails = (url)=>{
      window.location.href = url;
      setOpenModal(false);
    }


    return (
        <div className=" px-5 pt-6  min-w-full container text-black">
            <div className='flex w-full  items-center justify-between mb-5'>
                <h2 className="  text-base font-semibold">
                    My Wishlist <span className=" text-[12px] text-gray-500 ">({wishlist?.length} items)</span>
                </h2>
                <button onClick={handleDeletedall} className='p-2  text-[12px]   text-white border rounded-md bg-primary'>Clear All</button>
            </div>
            {wishlist?.length > 0 ? (
                <div className={`grid  gap-2 grid-cols-1  mb-10`}>
                    {wishlist?.map((product) => (
                        <div key={product.id} onClick={() => SeeDetails(`/product-details/${product?.id.replace(/\s+/g, '-')}`)} className="cursor-pointer " >
                          <WishlistItem
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmRemove}
                            product={product}
                            onRemove={(e) => {
                                e.stopPropagation();
                                handleRemoveClick(product);
                            }}
                            seeDetails={SeeDetails}
                        />
                      </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center py-10 px-3 bg-gray-100 border rounded-md">
                    <div className="flex flex-col items-center text-center">
                        <p className="text-lg font-semibold">Your wishlist is empty</p>
                        <p className="mb-4 text-gray-500 text-sm">You can easily fix that by browsing through our top categories or go to the products you like.</p>
                        <CiShoppingCart className='text-[70px]' />
                    </div>
                </div>
            )}

            {/* Render the modal conditionally */}
            {isModalOpen && (
                <WishlistModal
                    onClose={handleCloseModal}
                    isOpen={isModalOpen}
                    onConfirm={handleConfirmRemove}
                />
            )}
        </div>
    );
};

export default Wishlist;
