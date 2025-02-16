import { Heart, ShoppingCart } from 'lucide-react';
import React from 'react';

const SkeletonCard = () => {
    return (
        <div  className="bg-white p-4 rounded-lg shadow animate-pulse w-full">
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-md mb-2"></div>
            <div className="absolute top-2 right-2 flex space-x-1">
              <Heart className="w-5 h-5 text-gray-300" />
              <ShoppingCart className="w-5 h-5 text-gray-300" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-blue-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    );
};

export default SkeletonCard;