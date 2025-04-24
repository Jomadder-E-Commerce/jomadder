'use client'
import { useGetProductsByShopQuery } from "@/components/Redux/services/productApi/productApi";
import ProductCard from "@/components/shared/cards/ProductCard";
import Sidebar from "@/components/shared/Siderbar/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AllProductPage from "../../allProduct/AllProductPage";

const ShopProducts = ({id}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States for filters, sorting, and pagination
  const [price_start, setprice_start] = useState(null);
  const [price_end, setprice_end] = useState(null);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);




    const { data,isLoading, isFetching } = useGetProductsByShopQuery({
      shopId : id, page : currentPage, size : perPage, price_start:price_start !== null ? price_start / 17 : undefined, price_end,sort
    });
    const products = data?.data?.data?.items;
 useEffect(() => {
    const updateItemsPerPage = () =>
      setPerPage(window.innerWidth >= 1024 ? 10 : 12);
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

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
   const handleSortChange = (value) => {
    // console.log(value)
    setSort(value);
    updateURLParams({
      page: 1,
      minPrice: price_start,
      maxPrice: price_end,
      sort: value,
    });
  };

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
  const handlePageChange = (newPage) => {
    // console.log(Math.round(Number(price_start)));
  
    // Update the current page state
    setCurrentPage(newPage);
  
    // Log the computed parameters
    // console.log({
    //   page: newPage,
    //   minPrice: price_start ? Number(price_start) : 0,
    //   maxPrice: price_end ? Number(price_end) : 0,
    //   sort,
    // });
  
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
        categories={`${id}`}
      />
    </div>
  </div>
  );
};

export default ShopProducts;
