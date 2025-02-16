import React from 'react';
import CartProductSkeleton from './CartProductSkeleton';
import CartQuantitySkeleton from './CartQuantitySkeleton';

const CartSkeleton = () => {
    return (
       
             <div className='md:px-5 px-4 pb-10 bg-gray-100 h-screen'>
            <div className="p-4 mb-6 bg-white rounded-md shadow-md">
                <div className="flex items-center justify-between pb-4 border-b">
                    {/* Title placeholder */}
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {/* Date placeholder */}
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        <div className=" justify-between gap-5  xl:flex">
            <div className='flex-1'>
                <CartProductSkeleton/>
                <CartProductSkeleton/>
                <CartProductSkeleton/>
            </div>
            <div>
                <CartQuantitySkeleton/>
            </div>
        </div>

           </div>
    
    );
};

export default CartSkeleton;