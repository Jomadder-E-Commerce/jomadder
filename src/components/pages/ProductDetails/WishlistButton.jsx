"use client";

import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useDeleteWhishlistSingleMutation,
  usePostWishlistMutation,
} from "@/components/Redux/services/wishlistApi/wishlistApi";

const WishlistButton = ({ productId, productTitle, productImage, price }) => {
  const { token } = useSelector((state) => state.auth);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [postWishlist, { isLoading: postLoading }] = usePostWishlistMutation();
  const [deleteWishlist, { isLoading: deleteLoading }] =
    useDeleteWhishlistSingleMutation();

  useEffect(() => {
    // Check if the product is already in the wishlist
    if (token && productId) {
      setIsInWishlist(true); // Set based on actual data
    }
  }, [productId, token]);

  const handleWishlistClick = async () => {
    if (!token) {
      toast.info("Please log in to add items to your Wishlist.");
      return;
    }

    try {
      if (isInWishlist) {
        const res = await deleteWishlist(productId);
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Product removed from wishlist.");
          setIsInWishlist(false);
        } else {
          throw new Error(res?.error?.data?.message || "Failed to remove from wishlist.");
        }
      } else {
        const payload = {
          productId: productId.toString(),
          productTitle,
          productImage,
          price,
        };

        const res = await postWishlist(payload);
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Added to wishlist.");
          setIsInWishlist(true);
        } else {
          throw new Error(res?.error?.data?.message || "Failed to add to wishlist.");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div onClick={handleWishlistClick}>
      <Button
        className={`flex items-center justify-center h-auto px-2.5 bg-transparent border hover:text-red-400 hover:bg-white ${
          isInWishlist ? "text-red-400" : "text-primary"
        } ${deleteLoading || postLoading ? "animate-pulse" : ""}`}
        disabled={postLoading || deleteLoading}
      >
        {isInWishlist ? <FaHeart className="text-xl text-red-400" /> : <FaRegHeart className="text-xl" />}
      </Button>
    </div>
  );
};

export default WishlistButton;
