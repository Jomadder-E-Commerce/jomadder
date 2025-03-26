"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import {
  getDataFromLocalStorage,
  saveDataIntoLocalStorage,
  addNewDataIntoLocalStorage,
  removeOneDataFromLocalStorage,
} from "@/utils/localstorage";
import { GetfullPricing, getPercentageForPrice } from "../pricing/Pricing";
import useWishlist from "@/hooks/useWishlist";



const ProductCard = ({ name, price, discount, image, id }) => {
  const [productPrice, setProductPrice] = useState(Math.round(getPercentageForPrice(price)));
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { wishlist: wishlistData, AddIntoWishlist, RemoveFromWishlist } = useWishlist()
  //     useEffect(() => {

  //       // console.log(data?.data)
  //       const pricingData = Math.round(getPercentageForPrice(price))

  //       setProductPrice(pricingData)

  // }, [price])

  useEffect(() => {
    const wishlist = [...wishlistData];

    const productInWishlist = wishlist?.find((item) => item.id === id);
    setIsInWishlist(productInWishlist);
  }, [id]);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      // removeOneDataFromLocalStorage("wishlist", id);
      RemoveFromWishlist(id)
      setIsInWishlist(false);

    } else {
      const newWishlistItem = {
        id,
        name,
        price: productPrice,
        image,
      };
      AddIntoWishlist(newWishlistItem)
      // addNewDataIntoLocalStorage("wishlist", newWishlistItem);
      setIsInWishlist(true);
    }
  };

  return (
    <div className="relative w-full xsm:h-min h-min transition-all duration-500 sm:p-3 p-2 mx-auto hover:border-primary shadow-lg xl:max-w-full max-w-xs rounded-lg bg-white border-2 border-transparent">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute px-2 py-1 text-xs text-green-800 bg-green-200 rounded-full top-5 left-5">
          {discount}
        </div>
      )}

      {/* Wishlist and Cart Icons */}
      <div className="absolute z-10 flex space-x-2 top-5 right-5 group">
        {isInWishlist ? (
          <div
            onClick={handleWishlistClick}
            className="p-2  bg-white rounded-full text-red-500 hover:text-white shadow cursor-pointer group-hover:bg-red-500 group-hover::bg-primary"
          >
            <FaHeart className="" />
          </div>
        ) : (
          <div
            onClick={handleWishlistClick}
            className="p-2  bg-white rounded-full shadow cursor-pointer group-hover:bg-primary  text-primary group-hover:text-white"
          >
            <FaRegHeart className="" />
          </div>
        )}
      </div>

      <Link className="group" href={`/product-details/${id}`}>
        <Image
          priority
          src={image}
          width={200}
          height={200}
          alt={name}
          className="object-cover w-full rounded-md sm:h-52 h-auto"
        />

        {/* Product Name with Slicing */}
        <h2 className="w-full mt-2 text-sm font-semibold cursor-pointer truncate transition-all duration-500 text-start group-hover:text-blue-600">
          {name}
        </h2>
        <div className="h-[1.6px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-l from-transparent to-primary"></div>

        {/* Pricing Section */}
        <div className="flex items-center justify-between sm:mt-2 mt-1 text-sm">
          <div className="flex items-end gap-2">
            <p className="font-bold text-blue-600">৳ {productPrice}</p>
            <p className="text-xs font-semibold text-red-500 line-through">
              ৳{Math.round(GetfullPricing(price))}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;