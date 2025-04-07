"use client";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import moment from "moment";
import { useGetProductDetailsQuery } from "@/components/Redux/services/checkout/checkoutAPi";
import DynamicVerticalStepper from "@/components/ui/DynamicVerticalStepper";
import UserDetails from "./UserDetails";

const OrderDetails = ({ id }) => {
  const [isOrderItemExpanded, setIsOrderItemExpanded] = useState(true);
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);
  const [hasCoupon, setHasCoupon] = useState(true);

  const { data } = useGetProductDetailsQuery(id);
  const orderDetails = data?.data || {};
  const products = orderDetails.products || [];

  const productQuantities = products.map((product) => ({
    productId: product.productId,
    totalQuantity: product.skus.reduce((acc, sku) => acc + sku.quantity, 0),
  }));

  const productPrices = products.map((product) => ({
    productId: product.productId,
    totalPrice: product.skus.reduce(
      (acc, sku) => acc + sku.price * sku.quantity,
      0
    ),
  }));

  const subtotal = productPrices.reduce(
    (acc, product) => acc + product.totalPrice,
    0
  );

  const charge = orderDetails?.charge;
  const total = subtotal - orderDetails?.discount + (Number(charge) || 0);
  return (
    <div className="w-full  mx-auto p-6 bg-gray-50">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="md:text-2xl sm:text-xl text-lg font-semibold text-slate-700">
            Order ID: {orderDetails._id}
          </h1>
        </div>
      </div>
      <p className="my-5 text-gray-600">
        {moment(orderDetails.createdAt).format("lll")}
      </p>
      {/* user details */}
      <UserDetails orderDetails={orderDetails} />
      <div className="md:flex gap-3 mt-7">
        {/* Order Item */}
        <div className="bg-white w-full border rounded-md mb-4">
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <div>
              <h1 className="font-semibold text-xl text-slate-700">
                Order Item
              </h1>
            </div>
          </div>
          <div className="p-4">
            {products.map((product) => {
              const productQuantity = productQuantities.find(
                (p) => p.productId === product.productId
              )?.totalQuantity;
              const productTotalPrice = productPrices.find(
                (p) => p.productId === product.productId
              )?.totalPrice;

              return (
                <div key={product.productId} className="mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        unoptimized
                        src={product.productImage}
                        alt={product.productTitle}
                        height={100}
                        width={100}
                        className="object-cover md:w-28 md:h-28 w-14 h-14 mr-4 rounded-lg"
                      />
                      <Link href={`/product-details/${product.productId}`}>
                        <h3 className="font-bold mt-1 md:mb-4 text-xs md:text-lg text-slate-700 hover:underline">
                          {product.productTitle.length > 100
                            ? `${product.productTitle.substring(0, 100)}...`
                            : product.productTitle}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="w-full">
                    {product.skus.map((sku) => (
                      <div
                        key={sku._id}
                        className="flex justify-between mt-5 items-center border-b py-2"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            unoptimized
                            src={sku.image}
                            alt={`Sku Image`}
                            height={60}
                            width={60}
                            className="object-cover rounded-lg size-10 bg-slate-500"
                          />
                          <div>
                            <p className="text-gray-600 md:text-base sm:text-sm xsm:text-[12px] text-[11px] md:flex-row flex-col flex md:gap-0 gap-2">
                              {sku?.sku?.split(";").map((part, index) => (
                                <span key={index} className="block">
                                  <span className="md:inline hidden">
                                    {index == 1 && ","}
                                  </span>{" "}
                                  {part.trim()}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 md:inline hidden">
                          {sku.quantity} X ৳{sku.price}
                        </p>
                        <div className="font-semibold md:flex hidden text-gray-600 x items-center gap-3 text-md">
                          <p className="">
                            ৳{(sku.price * sku.quantity).toFixed(2)}
                          </p>
                        </div>
                        {/* For small screen */}

                        <div className="flex flex-col md:hidden gap-2">
                          <p className="text-gray-600 md:text-base sm:text-sm text-[13px]">
                            {sku.quantity} X ৳{sku.price}
                          </p>
                          <div className="font-semibold flex  md:text-base sm:text-sm text-[13px] text-gray-600 x items-center gap-3 text-md">
                            <p className="">
                              ৳{(sku.price * sku.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-5">
                      <div>
                        <p>Item details</p>
                      </div>
                      <p className="text-gray-600">{productQuantity}</p>
                      <div className="flex justify-between gap-5 items-center">
                        <p>৳{productTotalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Order Summary */}
        <div className="bg-white border rounded-md mb-4">
          <div className="p-4 flex justify-between items-center cursor-pointer">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-slate-700">
                  Order Summary
                </h2>
                <button className="btn text-yellow-400 text-sm px-3 py-2 font-bold rounded-xl my-2">
                  {orderDetails.status}
                </button>
              </div>
              <p className="my-3 text-gray-500">
                Use this personalized guide to get your store up and running
              </p>
            </div>
          </div>
          <div className="p-4 border-t text-gray-700">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>৳{Number(subtotal) + Number(orderDetails?.discount)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Charge</span>
              <span>৳{charge || 0}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-৳ {orderDetails?.discount}</span>
            </div>
            {/* <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free shipping (৳0.00)</span>
            </div> */}

            <div className="border-t pt-5 mt-5 text-sm md:text-md">
              {/* <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Paid due when invoice is sent
                </span>
                <span className="text-purple-600">Edit</span>
              </div> */}
              <div className="flex justify-between items-center">
                <span>Total</span>
                <span>৳ {total}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>
                  Paid By: {orderDetails?.paymentInfo?.method}
                  {orderDetails?.paymentInfo?.depositDate}
                </span>
                <span>
                  {orderDetails?.paymentInfo?.bankName ||
                    orderDetails?.paymentInfo?.name ||
                    "--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DynamicVerticalStepper steps={orderDetails.orderTracking} />
    </div>
  );
};

export default OrderDetails;
