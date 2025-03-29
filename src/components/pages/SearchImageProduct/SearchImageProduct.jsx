"use client"
import { useFindProductByImageMutation, useGetProductsByImageUriQuery } from '@/components/Redux/services/imageApi/imageApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import AllProductPage from '../allProduct/AllProductPage';
import Sidebar from '@/components/shared/Siderbar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '@/components/shared/LocalStorage/LocalStorage';
import { setSearchByImageProducts } from '@/components/Redux/features/AllSlice/searchByImageSlice';
import { toast } from 'react-toastify';

const SearchImageProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [findProductByImage] = useFindProductByImageMutation();
  // States for filters and pagination.
  const [isLoading, setisLoading] = useState(true);
  const [price_start, setprice_start] = useState(0);
  const [price_end, setprice_end] = useState(1000);
  // const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [products, setProducts] = useState([])

  const dispatch = useDispatch();

  const productsBySearch = useSelector((state) => state?.searchByImageProducts?.products);

  const imageUri = getLocalStorage('search-image_uri');




  // Refs for price inputs
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);





  useEffect(() => {
    const CompleteData = () => {
      setisLoading(true)

      setProducts([...productsBySearch])

      setisLoading(false)
    }

    CompleteData();
  }, [productsBySearch]);




  const { data: imageUriData, isLoading: isLoadingForImageUri, isFetching } = useGetProductsByImageUriQuery(
    {
      image_uri: encodeURIComponent(imageUri),
      query: Object.fromEntries(searchParams?.entries() || [])
    },
    {
      skip: !imageUri || searchParams?.size === 0
    }
  );


  useEffect(() => {
    const items = imageUriData?.data?.data?.items;
    if (items) {
      dispatch(setSearchByImageProducts(items || []));
      // setProducts([...items]);
    }
  }, [imageUriData, isLoadingForImageUri, isFetching]);




  // Update items per page dynamically based on screen width
  // useEffect(() => {
  //   const updateItemsPerPage = () =>
  //     setPerPage(window.innerWidth >= 1024 ? 10 : 12);
  //   updateItemsPerPage();
  //   window.addEventListener("resize", updateItemsPerPage);
  //   return () => window.removeEventListener("resize", updateItemsPerPage);
  // }, []);

  // Update URL parameters dynamically with a specific order
  const handleSearchQuery = (query, value) => {
    // dispatch(setSearchByImageProducts([]));
    // setProducts([]);
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // const updateURLParams = (params) => {
  //   const newParams = new URLSearchParams();
  //   if (params.page) newParams.set("page", params.page);
  //   if (params.minPrice) newParams.set("minPrice", params.minPrice);
  //   if (params.maxPrice) newParams.set("maxPrice", params.maxPrice);

  //   router.replace(`${window.location.pathname}?${newParams.toString()}`);
  //   window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  // };

  // Initialize state based on URL parameters
  // useEffect(() => {
  //   const minPrice = Number(searchParams.get("minPrice")) || 0;
  //   const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
  //   setprice_start(minPrice);
  //   setprice_end(maxPrice);
  //   setCurrentPage(Number(searchParams.get("page") || 1));
  // }, [searchParams]);

  // Apply filter and update URL on form submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const minPriceInput = Number(minPriceRef?.current?.value);
    const maxPriceInput = Number(maxPriceRef?.current?.value);

    if (minPriceInput > 0 && maxPriceInput > 0 && maxPriceInput < minPriceInput) {
      toast.warning("Max price must be greater than Min price!");
      return;
    }

    if (minPriceInput > 0) {
      handleSearchQuery("price_start", minPriceInput)
    }

    if (maxPriceInput > 0) {
      handleSearchQuery("price_end", maxPriceInput)
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearchQuery("page", newPage);
  };

  // handle sorting changes
  const handleSortChange = (value) => {
    let sort = "default";
    if (value === "low-to-high") sort = "price_up";
    if (value === "high-to-low") sort = "price_down";
    if (value === "popular") sort = "sales";

    handleSearchQuery("sort", sort);
  }

  if (productsBySearch?.length === 0 && !isLoading && !isLoadingForImageUri && (!imageUri || searchParams?.size === 0)) {
    router.push("/");
  }

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
          handleSortChange={handleSortChange}
          isLoading={isLoading || isLoadingForImageUri || isFetching}
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