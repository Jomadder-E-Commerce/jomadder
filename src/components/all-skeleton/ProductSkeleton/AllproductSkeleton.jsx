import React from 'react';
const ProductCardSkeleton = () => {
    return (
      <div className="relative w-full sm:h-[300px] h-[200px] p-3 border shadow-lg xl:max-w-full max-w-xs rounded-md bg-white animate-pulse">
        <div className="absolute top-5 left-5 w-12 h-6  bg-gray-200 rounded-full"></div>
        <div className="absolute top-5 right-5 space-x-2 flex">
          <div className="w-8 h-8  bg-gray-300 rounded-full "></div>
          <div className="w-8 h-8  bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-full sm:h-52 h-[104px]  bg-gray-200 rounded-md"></div>
        <div className="mt-2 w-3/4 h-4  bg-gray-200"></div>
        <div className="flex items-center justify-between mt-2">
          <div className="w-1/4 h-4  bg-gray-200"></div>
          <div className="w-12 h-4  bg-gray-200"></div>
        </div>
      </div>
    );
  };
const AllproductSkeleton = () => {
    return (
        <div>
               <div className="grid items-start justify-between w-full  gap-3 justify-items-center lg:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5 grid-cols-2">
                       {
                            [...Array(10)].map((item, key) => (
                                <ProductCardSkeleton key={key} />
                            ))
                       }
                    </div>
        </div>
    );
};

export default AllproductSkeleton;