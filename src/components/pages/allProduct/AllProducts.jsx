'use client'
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductsQuery } from "@/components/Redux/services/productApi/productApi";
import AllProductPage from "./AllProductPage";
import Sidebar from "@/components/shared/Siderbar/Sidebar";

const AllProducts = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States for filters, sorting, and pagination
  const [price_start, setprice_start] = useState(null);
  const [price_end, setprice_end] = useState(null);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Refs for price inputs
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  // Fetch data based on filters and sorting
  const { data, isLoading ,isFetching } = useGetProductsQuery({
    category: categories,
    page: currentPage,
    size: perPage,
    price_start: price_start !== null ? price_start / 17 : undefined,
    price_end: price_end !== null ? price_end / 17 : undefined,
    sort: sort || undefined, 
  });
  const products = data?.data?.data?.items;
  // console.log(products)
  console.log(isLoading)
  // Update items per page dynamically based on screen width
  useEffect(() => {
    const updateItemsPerPage = () =>
      setPerPage(window.innerWidth >= 1024 ? 10 : 12);
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Update URL parameters dynamically
  const updateURLParams = (params) => {
    const newParams = new URLSearchParams();
    newParams.set("q",categories)
    if (params.page) newParams.set("page", params.page);
    if (params.minPrice) newParams.set("minPrice", params.minPrice);
    if (params.maxPrice) newParams.set("maxPrice", params.maxPrice);
    if (params.sort) newParams.set("sort", params.sort);
    
    router.replace(`${window.location.pathname}?${newParams.toString()}`);
    // window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  useEffect(() => {
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
    const sort = searchParams.get("sort") || "";

    setprice_start(minPrice);
    setprice_end(maxPrice);
    setSort(sort);
    setCurrentPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  // Handle sorting change
  const handleSortChange = (value) => {
    console.log(value)
    setSort(value);
    updateURLParams({
      page: 1,
      minPrice: price_start,
      maxPrice: price_end,
      sort: value,
    });
  };

  // Apply filter and update URL on form submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const minPriceInput = Number((parseInt(minPriceRef.current.value)));
    const maxPriceInput = Number(parseInt(maxPriceRef.current.value));

    const minPrice = isNaN(minPriceInput) ? 0 : minPriceInput;
    const maxPrice = isNaN(maxPriceInput) ? 1000 : maxPriceInput;

    if (minPrice >= 0 && maxPrice >= minPrice) {
      setprice_start(minPrice);
      setprice_end(maxPrice);
      setCurrentPage(1);
      updateURLParams({ page: 1, minPrice, maxPrice, sort });
    } else {
      alert("Please enter a valid price range.");
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log(Math.round(Number(price_start)));
  
    // Update the current page state
    setCurrentPage(newPage);
  
    // Log the computed parameters
    console.log({
      page: newPage,
      minPrice: price_start ? Number(price_start) : 0,
      maxPrice: price_end ? Number(price_end) : 0,
      sort,
    });
  
    // Construct the new parameters object
    const newObj = { page: newPage };
  
    if (price_end != null) {
      newObj.maxPrice = Number(price_end) ;
    }
  
    if (price_start != null) {
      newObj.minPrice = Number(price_start) ;
    }
  
    // Update the URL parameters
    updateURLParams({
      ...newObj,
      sort,
    });
  };
  

  return (
    <div className="container relative w-full gap-3 mx-auto mt-5 lg:flex">
      <div className="lg:w-[240px] lg:block hidden">
        <Sidebar className="sticky z-50 mb-5 border shadow-lg top-[69px]" />
      </div>
      <div className="w-full mx-auto">
        <AllProductPage
          handleFilterSubmit={handleFilterSubmit}
          handlePageChange={handlePageChange}
          handleSortChange={handleSortChange}
          isLoading={isFetching}
          products={products}
          currentPage={currentPage}
          minPriceRef={minPriceRef}
          maxPriceRef={maxPriceRef}
          sort={sort}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default AllProducts;
