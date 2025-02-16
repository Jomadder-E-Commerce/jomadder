"use client"
import React from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line, RiInfoI } from 'react-icons/ri';
import Link from 'next/link';
import { FaInfo } from 'react-icons/fa';

const WishlistItem = ({ product, onRemove,handleCloseModal,handleConfirmRemove ,seeDetails}) => {
    return (
        <div  className='sm:items-center items-start gap-5 md:p-4 sm:p-3 p-3 bg-white border rounded-lg shadow-md flex flex-col sm:flex-row'>
            <Image unoptimized  
                src={product?.image} 
                alt={product?.name}
                className="object-cover w-full   h-[160px] rounded-lg"
                width={180}
                height={180}
            />
            <div>
                <div className="flex-grow">
                    <h3 className="text-sm font-semibold ">
                        {product?.name.length > 80 ? product?.name.slice(0, 80) + "..." : product?.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-center gap-2 mt-2 ">
                        <span className="text-sm font-semibold text-red-500">৳{product?.price}</span>
                        {/* <span className="text-sm text-gray-400 line-through">{300}</span> */}
                    </div>

                    {/* Stock Alert */}
                  
                </div>
                <div className="md:gap-3 gap-1  mt-2 text-sm  flex items-center">
                    
                    <button
                        className="flex items-center gap-2 px-4  py-2 text-gray-500 transition border rounded-md hover:bg-red-600 hover:text-white"
                        onClick={onRemove} // Trigger remove action
                    >
                        <RiDeleteBin6Line /> Remove
                    </button>
                    <div onClick={()=>{seeDetails(`/product-details/${product?.id}`)}}>
                    <button
                        className="flex items-center gap-2 px-4  py-2 text-gray-600 transition border rounded-md hover:bg-blue-600 hover:text-white"
                         // Trigger remove action
                    >
                        <FaInfo className=''/> Details
                    </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WishlistItem;
