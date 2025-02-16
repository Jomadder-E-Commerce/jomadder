import React from 'react';

const SupportSkeleton = () => {
    return (
        <div className="container mx-auto p-4 space-y-6 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        
        {/* Request Info Skeleton */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-64 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
          
          {/* Message Skeleton */}
          <div className="border-t pt-4">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
          
          {/* Images Skeleton */}
          <div className="border-t pt-4">
            <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
  
        {/* User Info Skeleton */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
  
        {/* Order Button Skeleton */}
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    );
};

export default SupportSkeleton;