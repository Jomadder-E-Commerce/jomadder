import React from 'react';

const DetailsSkeleton = () => {
    return (
        <div className="border rounded-md overflow-hidden animate-pulse">
        {[...Array(5)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            {[...Array(2)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`w-1/2 p-3 ${colIndex === 0 ? "border-r" : ""} border-b`}
              >
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
};

export default DetailsSkeleton;