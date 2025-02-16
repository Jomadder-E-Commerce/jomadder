"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "@/lib/sidebarData";
import { cn } from "@/lib/utils";

const Sidebar = ({ setIssideOpen, className }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [subCategory, setsubategory] = useState(0);
  const [hoveredItemPosition, setHoveredItemPosition] = useState({ top: 0 });
  const router = useRouter();
  const path = usePathname();

  let limitedCategories = categories;

  if (!path.startsWith("/all-product")) {
    limitedCategories = categories.slice(0, 9);
  }

  const handleMouseEnter = (index, event, subcategoriesLength) => {
    setHoveredCategory(index);
    const rect = event.target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const maxDropdownHeight = 300;
    let top = rect.top;

    if (subcategoriesLength >= 10) {
      if (top + maxDropdownHeight > viewportHeight) {
        top = viewportHeight - maxDropdownHeight;
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = (categoryName) => {
    setHoveredCategory(null);
    const formattedCategoryName = categoryName.replace(/\s+/g, '-'); // Replace spaces with hyphens
    router.push(`/all-product?q=${formattedCategoryName}`);
    setIssideOpen(false); // Close the sidebar
  };

  const getGridColumnsClass = (subcategoryCount) => {
    if (subcategoryCount <= 10) return 'grid-cols-1 gap-y-1 w-72';
    if (subcategoryCount <= 20) return 'grid-cols-2 gap-x-6 gap-y-1 w-[300px]';
    if (subcategoryCount <= 30) return 'grid-cols-3 gap-x-6 gap-y-1 w-[550px]';
    return 'grid-cols-4 gap-x-6 gap-y-1 w-[700px]';  // For more than 30, use 4 columns
  };

  const getGridColSpanClass = (subcategoryCount) => {
    if (subcategoryCount <= 10) return 'col-span-1';
    if (subcategoryCount <= 20) return 'col-span-2';
    if (subcategoryCount <= 30) return 'col-span-3';
    return 'col-span-4';  // For more than 30, use 4 columns
  };

  return (
    <div onMouseLeave={handleMouseLeave} className={cn("bg-white rounded-md max-w-52 custom-scrollbar", className)}>
      <ul className="">
        {limitedCategories?.map((category, index) => (
          <li
            key={index}
            onMouseEnter={(e) => handleMouseEnter(index, e, category?.subcategories?.length)}
            className={`relative px-4 py-[10px] cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out ${hoveredCategory === index ? "mr-0 bg-secondary" : "mr-1"
              } ${index === 0 ? "rounded-t-md" : ""}`}
          >
            <div className={`flex items-center justify-center gap-4 ${hoveredCategory === index ? "text-primary" : ""}`}>
              <Image unoptimized width={30} height={20} src={category?.icon} alt={index}></Image>
              <p className="text-sm">{category?.name}</p>
            </div>
            <p className={`text-xl ${hoveredCategory === index ? "text-primary" : ""}`}>{category?.arrow}</p>

            <div className={`absolute top-0 left-[199px] bg-white z-[100] shadow-xl rounded-md rounded-tl-none drop-shadow-xl flex flex-col transition-all duration-500 ease-in-out transform
              ${hoveredCategory === index ? "translate-x-0" : "-translate-x-5"}`}
            >
              {hoveredCategory === index && category?.subcategories ? (
                <ul className={`bg-white border-b-[8px] border-white rounded-md custom-scrollbar overflow-y-auto max-h-[300px] p-4 grid ${getGridColumnsClass(category?.subcategories?.length)}`}>
                  <p className={`font-bold border-b-2 py-1 ${getGridColSpanClass(category?.subcategories?.length)}`}>{category?.name}</p>
                  {category?.subcategories?.map((subcategory, subIndex) => (
                    <li key={subIndex} className="">
                      <ul className="">
                        <div onClick={() => handleCategoryClick(subcategory)}>
                          <div
                            key={subIndex}
                            className="relative block p-2 py-1 truncate rounded-md cursor-pointer group hover:text-primary"
                          >
                            {subcategory}
                            <div className='h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-l from-transparent to-primary' />
                          </div>
                        </div>
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  onClick={() => handleCategoryClick(category?.name)} // Handle category click
                  className="absolute top-0 left-0 w-full h-full"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;