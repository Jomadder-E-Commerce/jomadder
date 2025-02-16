"use client";
import React from "react";

const CartProductSkeleton = () => {
    return (
        <div className="w-full animate-pulse">
            {/* Main container */}
            <div className="mb-4 bg-white w-full px-6 pb-4 border-2 rounded-md shadow-md border-gray-200">
                <div className="pt-4 border-b">
                    {/* Image and Order ID */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-col sm:flex-row gap-4">
                            {/* Image placeholder */}
                            <div className="sm:w-12 sm:h-12 w-full h-full bg-gray-200 mb-1 rounded-md"></div>
                            {/* Text placeholders */}
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 w-32 mb-2 rounded"></div>
                                <div className="h-4 bg-gray-200 w-48 rounded"></div>
                            </div>
                        </div>
                        {/* Delete icon placeholder */}
                        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                {/* SKU details skeleton */}
                <div className="flex flex-col sm:flex-row py-2 sm:items-center justify-between gap-5 border-b">
                    <div className="flex items-center gap-3">
                        {/* SKU Image placeholder */}
                        <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                        {/* SKU Text placeholder */}
                        <div className="h-4 bg-gray-200 w-24 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* Price placeholder */}
                        <div className="h-4 bg-gray-200 w-16 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Total Price placeholder */}
                        <div className="h-4 bg-gray-200 w-20 rounded"></div>
                        <div className="h-8 w-20 bg-primary rounded text-white"></div>
                    </div>
                </div>

                {/* Item Details skeleton */}
                <div className="flex justify-between gap-5 mt-3 text-sm">
                    <div className="h-4 bg-gray-200 w-16 rounded"></div>
                    <div className="h-4 bg-gray-200 w-10 rounded"></div>
                    <div className="h-4 bg-gray-200 w-16 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default CartProductSkeleton;
