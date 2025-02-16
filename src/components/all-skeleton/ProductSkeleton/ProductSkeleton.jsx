const ProductCardSkeleton = () => {
    return (
      <div className="relative w-full h-[300px] p-3 border shadow-lg xl:max-w-full max-w-xs rounded-md bg-white animate-pulse">
        <div className="absolute top-5 left-5 w-12 h-6  bg-gray-200 rounded-full"></div>
        <div className="absolute top-5 right-5 space-x-2 flex">
          <div className="w-8 h-8  bg-gray-300 rounded-full "></div>
          <div className="w-8 h-8  bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-full h-52  bg-gray-200 rounded-md"></div>
        <div className="mt-2 w-3/4 h-4  bg-gray-200"></div>
        <div className="flex items-center justify-between mt-2">
          <div className="w-1/4 h-4  bg-gray-200"></div>
          <div className="w-12 h-4  bg-gray-200"></div>
        </div>
      </div>
    );
  };
  
  const ProductGridSkeleton = () => {
    return (
      <div className="my-6">
        <div className="w-52 h-4 bg-gray-200 mx-auto mb-6 animate-pulse"></div>
        
        <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
          {Array(10).fill(null).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductGridSkeleton;
  