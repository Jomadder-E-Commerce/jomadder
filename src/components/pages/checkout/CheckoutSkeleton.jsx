import React from 'react';

const CheckoutSkeleton = () => {
    return (
        <div className="w-full p-6 bg-white border rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">CHECKOUT</h2>
  
        {/* Skeleton Blocks */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>
  
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>
  
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>
  
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>
  
        <div className="h-20 bg-gray-300 animate-pulse rounded mb-4"></div>
  
        <div className="h-16 bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
};

export default CheckoutSkeleton;