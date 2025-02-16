import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryLink = ({category}) => {
    return (
        <Link
      href={`/all-product?q=${category?.title.replace(/\s+/g, "-")}`}
      className="flex flex-col  h-full items-center justify-end gap-1 xs:gap-2 sm:gap-3  md:py-4 sm:py-3 py-2 px-1  rounded-lg  transition-all duration-300 ease-in-out group  hover:shadow-md relative "
    >
      <div className="relative     w-14 h-14 lg:h-16 lg:w-16 xl:w-[80px] xl:h-[80px]  transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Image
             src={category.icon || "/placeholder.svg"}
             alt={category.title}
             fill
             className="object-contain   rounded-full "
        />
      </div>
      <span className="text-xs xs:text-sm sm:text-base md:text-lg xl:text-xl  font-medium text-black group-hover:text-primary transition-colors duration-300 ease-in-out text-center">
        {category?.title}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </Link>
    );
};

export default CategoryLink;