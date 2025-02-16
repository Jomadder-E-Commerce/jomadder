import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  useGetCartListQuery,
  useGetCheckallQuery,
} from "../Redux/services/cartApi";
import CartProductSkeleton from "../all-skeleton/cartSkeleton/CartProductSkeleton";

const PayCard = ({ product}) => {
  // const { data, isLoading } = useGetCheckallQuery();
  const checkoutData = Array.isArray(product) ? product :  [product] 

  return (
    <div>
    
          <div className="w-full">
          {checkoutData?.map((product) => (
            <div
              className="mb-4 bg-white w-full px-6 pb-4 border rounded-md shadow-md  "
              key={product?._id}
            >
              <div className="pt-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-col sm:flex-row gap-4">
                    <div className="flex gap-4">
                      <div className="sm:w-12 sm:h-12 w-full h-full  mb-1">
                        <Image
                          unoptimized
                          src={product?.productImage}
                          alt="Product"
                          width={100}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold sm:text-md">
                        Order ID: #{product?.productId}
                      </p>
                      <p className="text-sm pr-4">{product?.productTitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {product?.skus?.map((sku) => (
                <div className="" key={sku._id}>
                  <div className="flex border-b flex-col sm:flex-row py-2 sm:items-center  justify-between gap-5">
                    <div className="items-center gap-3 flex">
                      <Image
                        unoptimized
                        src={sku.image}
                        alt="SKU"
                        width={40}
                        height={40}
                        className="object-cover sm:w-10"
                      />
                      <p className="text-sm">Sort by color: {sku.sku}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-sm">
                        {sku.quantity} * ৳{parseFloat(sku.price).toFixed(2)}
                      </p>
                      <p className="sm:hidden block">
                        ৳{(sku.quantity * parseFloat(sku.price)).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <p className="sm:block hidden">
                        ৳{(sku.quantity * parseFloat(sku.price)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-row justify-between gap-5 mt-3 text-sm">
                <p>Item Details</p>
                <p>
                  {product?.skus?.reduce((acc, sku) => acc + sku.quantity, 0)}{" "}
                  items
                </p>
                <p>
                  Total : ৳
                  {Math.round(
                    product?.skus?.reduce(
                      (acc, sku) => acc + sku.quantity * sku.price,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default PayCard;
