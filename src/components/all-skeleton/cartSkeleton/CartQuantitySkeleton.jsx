import React from "react";

const CartQuantitySkeleton = () => {
    return (
        <div className="w-full h-full xl:w-[420px] lg:my-0 my-5 animate-pulse">
            <div className="w-full p-2 bg-white border rounded-md shadow-md">
                {/* Title placeholder */}
                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>

                {/* Product Price and Pay Now placeholders */}
                <div className="flex justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex justify-between py-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>

                {/* Pay after delivery placeholder */}
                <div className="w-full h-16 p-2 my-2 bg-gray-200 rounded-md"></div>

                {/* Button placeholder */}
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
            </div>
        </div>
    );
};

export default CartQuantitySkeleton;
