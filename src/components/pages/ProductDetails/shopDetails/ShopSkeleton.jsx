import React from 'react';

const ShopSkeleton = () => {
    return (
        <div className="animate-pulse space-y-4">
        <div className="bg-gray-300 h-6 w-3/4 mx-auto rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 mx-auto rounded"></div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-300 h-32 rounded-md"></div>
          <div className="bg-gray-300 h-32 rounded-md"></div>
        </div>
        <div className="bg-gray-300 h-32 w-full mt-6 rounded-md"></div>
        <div className="bg-gray-300 h-6 w-1/2 mx-auto mt-6 rounded"></div>
        <div className="bg-gray-300 h-8 w-1/3 mx-auto mt-4 rounded"></div>
      </div>
    );
};

export default ShopSkeleton;