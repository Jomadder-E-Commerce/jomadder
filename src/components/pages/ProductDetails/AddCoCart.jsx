"use client";

import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { usePostCartMutation } from "@/components/Redux/services/cartApi";

const AddToCart = ({ productId, productTitle, productImage, skus }) => {
  const { token } = useSelector((state) => state.auth);
  const [postCart, { isLoading: postCartLoading }] = usePostCartMutation();

  const handleAddToCart = async () => {
    if (!token) {
      toast.info("Please log in to add items to your Cart.");
      return;
    }

    const payload = {
      productId,
      productTitle,
      productImage,
      skus,
    };

    try {
      const data = await postCart(payload);
      if (data?.data?.success) {
        toast.success(
          data?.data?.message || "Successfully added to Cart."
        );
      } else {
        throw new Error(
          data?.error?.data?.message || "Failed to add to Cart."
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="flex items-center justify-center gap-4 px-4 py-2 bg-transparent border hover:text-white border-primary text-primary"
      disabled={postCartLoading}
    >
      <IoCartOutline className="text-lg" /> Add to cart
    </Button>
  );
};

export default AddToCart;
