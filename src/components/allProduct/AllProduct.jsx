"use client";

import React, { useState } from "react";
import { FaFilter, FaStar } from "react-icons/fa";
import { Cross1Icon } from "@radix-ui/react-icons";
import { DynamicSelect } from "../shared/form/DynamicSelect";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function AllProduct() {
  const [priceToggle, setPriceToggle] = useState(true);
  const [categoriesToggle, setCategoriesToggle] = useState(true);

  const togglePrice = () => {
    setPriceToggle(!priceToggle);
  };
  const toggleCategories = () => {
    setCategoriesToggle(!categoriesToggle);
  };

  return (
    <div>
      <div className="container">
        <h1>All Product</h1>
        <section className="container my-5 md:my-10">
          {/* price */}
          <div className="">
            <div className="flex items-center gap-5">
              <div
                className="text-left mb-5 
               cursor-pointer"
              >
                <span className="flex gap-3  ">
                  <p onClick={togglePrice} className="">
                    Price (AED){" "}
                  </p>
                  <span>
                    {priceToggle ? (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setPriceToggle(!priceToggle)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setPriceToggle(!priceToggle)}
                      />
                    )}
                  </span>
                </span>
                {priceToggle && (
                  <div className="text-left ease-out duration-500 flex justify-center items-center gap-3">
                    <div>
                      <Input
                        type="number"
                        className="w-[80px] mt-2 hover:border-black"
                        placeholder=""
                      />
                    </div>
                    <p>To</p>
                    <div>
                      <Input
                        type="number"
                        className="w-[100px] mt-2 hover:border-black"
                        placeholder=""
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Categories */}
            <div className="flex items-center gap-5">
              <div
                className="text-left mb-5 
               cursor-pointer"
              >
                <span className="flex gap-3  ">
                  <p onClick={toggleCategories} className="">
                    Categories
                  </p>
                  <span>
                    {categoriesToggle ? (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setPriceToggle(!categoriesToggle)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setPriceToggle(!categoriesToggle)}
                      />
                    )}
                  </span>
                </span>
                {categoriesToggle && (
                  <div className="relative"> 
                    <Input className="w-[220px] my-3 hover:border-black placeholder:px-4" type="text" placeholder="Search " />
                    <IoIosSearch className="absolute right-0 left-1 text-2xl text-gray-500 bottom-[6px] pointer-events-none z-10" />
                  </div> 
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="block md:hidden">
                <DynamicSelect
                  className="w-[220px]"
                  options={["Low to high", "High to low"]}
                  value={["asc", "dsc"]}
                  defaultValue={"asc"}
                  placeholder="Sort by price"
                  onValueChange={(value) => handleSortChange(value)}
                />
              </div>
              {/* Drawer for small devices */}
              <div className="md:hidden">
                <Drawer direction="left">
                  <DrawerTrigger asChild>
                    <button className="flex items-end gap-1 p-2 bg-white border rounded-md cursor-pointer right-4 top-2 hover:bg-slate-50">
                      Filters <FaFilter className="ml-1 text-gray-500" />
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <div className="relative w-[270px]">
                        <Input
                          className="z-50 pr-8 shadow-sm "
                          placeholder="Search by name"
                          // onChange={handleSearchChange}
                          // value={searchQuery}
                        />
                        <IoIosSearch className="absolute right-2 text-2xl text-gray-500 bottom-[6px] pointer-events-none z-10" />
                      </div>
                    </DrawerHeader>
                    {/* {isCategoriesLoading ? (
                  <Skeleton className="h-5 w-full bg-slate-200" />
                ) : (
                  <FilterComponent
                    title='Categories'
                    options={option}
                    selectedOptions={selectedCategories}
                    onChange={handleCategoryChange}
                    onReset={handleResetFilters}
                    filterType='category'
                  />
                )} */}
                    {/* <FilterComponent
                  title='Price Range'
                  options={priceRanges}
                  selectedOptions={selectedPriceRange}
                  onChange={handlePriceRangeChange}
                  onReset={handleResetFilters}
                  filterType='price'
                /> */}
                    <div>
                      <h4 className="mt-2 text-lg font-extrabold">
                        Rating Range
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            key={rating}
                            // onClick={() => handleStarClick(rating)}
                            // onMouseEnter={() => setHoverRating(rating)}
                            // onMouseLeave={() => setHoverRating(null)}
                            // className={` cursor-pointer transition-colors duration-300 ease-in-out ${rating <= (hoverRating || selectedRating) ? 'text-amber-500' : 'text-gray-400'} hover:text-yellow-500`}
                          >
                            <FaStar size={18} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <DrawerDescription></DrawerDescription>
                    <DrawerFooter>
                      <button
                      // onClick={handleResetFilters}
                      // className={cn(' relative px-5 bg-slate-50 border rounded-md group', { 'hidden': !filters })}
                      >
                        Reset
                        <Cross1Icon className="absolute invisible font-bold text-red-500 -top-1.5 -right-1.5 bg-white rounded-full p-0.5 group-hover:visible size-3" />
                      </button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="hidden md:block">
                {/* {
              paginatedProducts?.length > 0 && <PaginationFilter
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            } */}
              </div>
              {/* {
            isLoading ? <Skeleton className={"w-96 !bg-slate-200 h-6 md:block hidden"} /> : <div className='flex gap-1'>
              <span className='hidden ml-1 font-semibold md:block'>{`Page ${currentPage} of ${totalPages}`}</span>
              <span className='hidden md:block'>-</span>
              <span className='hidden font-semibold md:block'>{`${remainingCount} / ${totalItems}`}</span>
            </div>
          } */}
            </div>
          </div>

          <div className="flex">
            {/* Sidebar for larger screens */}
            <div className="sticky top-0 hidden h-full p-5 overflow-y-auto rounded-lg md:block w-52 bg-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">Filters</h4>
                <button
                // onClick={handleResetFilters}
                // className={cn('relative h-5 px-2 text-xs bg-white border rounded-md group', { 'hidden': !filters })}
                >
                  Reset
                  <Cross1Icon className="absolute invisible font-bold text-red-500 -top-1.5 -right-1.5 bg-white rounded-full p-0.5 group-hover:visible size-3" />
                </button>
              </div>
              {/* {isCategoriesLoading ? (
                  <AllproductCategories/>
                ) : (
                  <FilterComponent
                    title='Categories'
                    options={option}
                    selectedOptions={selectedCategories}
                    onChange={handleCategoryChange}
                    onReset={handleResetFilters}
                    filterType='category'
                  />
                )} */}
              {/* <FilterComponent
            title='Price Range'
            options={priceRanges}
            selectedOptions={selectedPriceRange}
            onChange={handlePriceRangeChange}
            onReset={handleResetFilters}
            filterType='price'
          /> */}
              <div>
                <h4 className="mt-2 text-lg font-extrabold">Rating Range</h4>
                <div className="flex items-center gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span
                      key={rating}
                      // onClick={() => handleStarClick(rating)}
                      // onMouseEnter={() => setHoverRating(rating)}
                      // onMouseLeave={() => setHoverRating(null)}
                      // className={` cursor-pointer transition-colors duration-300 ease-in-out ${rating <= (hoverRating || selectedRating) ? 'text-amber-500' : 'text-gray-400'} hover:text-yellow-500`}
                    >
                      <FaStar size={18} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid items-start justify-between w-full grid-cols-1 gap-5 pb-10 md:ml-5 justify-items-center lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
              {/* {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : isError
              ? <h3 className='flex items-center font-semibold justify-center min-h-[70vh] w-full col-span-4'>Failed to load products.</h3>
              : paginatedProducts?.length === 0
                ? <h3 className='flex items-center font-semibold justify-center min-h-[70vh] w-full col-span-4'>No products match your current filters.</h3>
                : paginatedProducts?.map((productDetail, index) => (
                  <ProductCard key={index} productDetail={productDetail} />
                ))
          } */}
              {/* {
            isLoading ? <Skeleton className={"w-52 !bg-slate-200 h-6 md:hidden block"} /> : <div className='block md:hidden'>
              {
                paginatedProducts?.length > 0 && <PaginationFilter
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              }
            </div>
          } */}
            </div>
          </div>
        </section>
        {/* <CateBags/>
            <Jewelary />
            <ShoeCategory />
            <Watchces />
            <Sunglasses />
            <TrendyProduct /> */}
      </div>
    </div>
  );
}
