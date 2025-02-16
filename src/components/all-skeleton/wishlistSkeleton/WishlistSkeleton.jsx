import React from 'react';


const SkeletonWishlistItem = () => {
  return (
    <div className='animate-pulse sm:items-center items-start gap-5 p-4 space-y-2 bg-white border rounded-lg shadow-md flex flex-col sm:flex-row'>
      <div className='sm:w-24 w-full sm:h-full h-60 bg-gray-200 rounded-lg'></div>
      <div className="flex-grow space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        <div className="flex gap-3 mt-4 text-sm">
          <div className="w-28 h-10 bg-gray-200 rounded-md"></div>
          {/* <div className="w-28 h-10 bg-gray-200 rounded-md"></div> */}
        </div>
      </div>
    </div>
  );
};



const SkeletonDashWishlist = () => {
  return (
    <div className="p-4 container">
      <div className='flex items-center justify-between mb-5'>
        <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
        <div className='md:w-28 w-20 h-8 bg-gray-200 rounded-md'></div>
      </div>
      <div className="grid md:gap-4 gap-2 grid-cols-1 xl:grid-cols-2 mb-10">
        <SkeletonWishlistItem />
        <SkeletonWishlistItem />
        <SkeletonWishlistItem />
        <SkeletonWishlistItem />
      </div>
    </div>
  );
};

export default SkeletonDashWishlist;
