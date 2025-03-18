"use client"
import { useFindProductByImageMutation } from '@/components/Redux/services/imageApi/imageApi';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import AllProductPage from '../allProduct/AllProductPage';
import Sidebar from '@/components/shared/Siderbar/Sidebar';

const SearchImageProduct = ({ image }) => {
  console.log("hello arif",image)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [findProductByImage] = useFindProductByImageMutation()
  // States for filters and pagination.
  const [isLoading, setisLoading] = useState(true)
  const [price_start, setprice_start] = useState(0);
  const [price_end, setprice_end] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [products, setProducts] = useState([])

  // Refs for price inputs
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  // Fetch data based on filters
  // const { data, isLoading } = useFindProductByImageQuery({
  //   uri: image,
  //   page: currentPage,
  //   size: perPage,
  //   price_start: price_start,
  //   price_end: price_end,
  // });
  useEffect(() => {
    const CompleteData = async () => {
      setisLoading(true)
      const { data } = await findProductByImage({
        uri: image,
        page: currentPage,
        size: perPage,
        price_start: price_start,
        price_end: price_end,
      })
      console.log(data)
      if (data) {
        const productData = data?.data?.data?.items
        setProducts([...productData])
      }

      setisLoading(false)
    }

    CompleteData()
  }, [price_start, price_end, currentPage])

  //  console.log({
  //   uri: image,
  //   page: currentPage,
  //   size: perPage,
  //   price_start: price_start,
  //   price_end: price_end,
  // })
  // Update items per page dynamically based on screen width
  useEffect(() => {
    const updateItemsPerPage = () =>
      setPerPage(window.innerWidth >= 1024 ? 10 : 12);
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Update URL parameters dynamically with a specific order
  const updateURLParams = (params) => {
    const newParams = new URLSearchParams();
    if (params.page) newParams.set("page", params.page);
    if (params.minPrice) newParams.set("minPrice", params.minPrice);
    if (params.maxPrice) newParams.set("maxPrice", params.maxPrice);

    router.replace(`${window.location.pathname}?${newParams.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  // Initialize state based on URL parameters
  useEffect(() => {
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
    console.log(minPrice, maxPrice, "balga");
    setprice_start(minPrice);
    setprice_end(maxPrice);
    setCurrentPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  // Apply filter and update URL on form submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const minPriceInput = parseInt(minPriceRef.current.value);
    const maxPriceInput = parseInt(maxPriceRef.current.value);

    const minPrice = isNaN(minPriceInput) ? 0 : minPriceInput;
    const maxPrice = isNaN(maxPriceInput) ? 1000 : maxPriceInput;

    if (minPrice >= 0 && maxPrice >= minPrice) {
      setprice_start(minPrice);
      setprice_end(maxPrice);
      setCurrentPage(1);
      updateURLParams({ page: 1, minPrice, maxPrice });
    } else {
      alert("Please enter a valid price range.");
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateURLParams({
      page: newPage,
      minPrice: price_start,
      maxPrice: price_end,
    });
  };

  return (
    <div className="container relative w-full gap-3 mx-auto lg:flex">
      {/* Sticky Sidebar */}
      <div className="lg:w-[240px] lg:block hidden">
        <Sidebar className="sticky z-50 mb-5 drop-shadow-sm shadow-lg top-[92px]" />
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto">
        <AllProductPage
          handleFilterSubmit={handleFilterSubmit}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          products={products}
          currentPage={currentPage}
          minPriceRef={minPriceRef}
          maxPriceRef={maxPriceRef}
          categories={"Image"}
        />
      </div>
    </div>

  );
};

export default SearchImageProduct;