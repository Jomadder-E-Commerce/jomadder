"use client";
import Image from "next/image";
import Transaction from "@/assets/dashboard/transaction.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import cart from "@/assets/AllCategories/approved-delivery.png";
import moment from "moment";
import { useGetProductDetailsQuery } from "@/components/Redux/services/checkout/checkoutAPi";

// Skeleton component for order confirmation
const SkeletonOrderConfirmation = () => {
  return (
    <div className="container">
      <div className="px-5 pt-5 bg-gray-100">
        {/* Header Skeleton */}
        <div className="p-4 mb-6 bg-white rounded-md shadow-md animate-pulse">
          <div className="flex flex-col items-center justify-between pb-4 border-b sm:flex-row">
            {/* Placeholder for the title */}
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            {/* Placeholder for the date */}
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Order Status Skeleton */}
        <div className="bg-white p-6 rounded shadow-md mb-6 text-center border animate-pulse">
          {/* Placeholder for the order success image */}
          <div className="w-36 h-36 bg-gray-300 rounded-full mx-auto"></div>
          {/* Placeholder for the order status text */}
          <div className="mt-4">
            <div className="h-6 w-2/3 bg-gray-300 rounded mx-auto"></div>
          </div>
          {/* Placeholder for the subtext */}
          <div className="mt-2">
            <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto"></div>
          </div>
        </div>
        {/* Continue Shopping Button Skeleton */}
        <div className="text-center">
          <div className="inline-block h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Page = ({ params }) => {
  const {
    data: OrderDetailsData,
    isLoading,
    isSuccess: orderIsSuccess,
    isFetching,
  } = useGetProductDetailsQuery(params?.id);

  // Show skeleton while loading or fetching data
  if (isLoading) {
    return <SkeletonOrderConfirmation />;
  }

  return (
    <div className="container">
      <div className="px-5 pt-5 bg-gray-100">
        <div className="p-4 mb-6 bg-white rounded-md shadow-md">
          <div className="flex flex-col items-center justify-between pb-4 border-b sm:flex-row">
            <h1 className="text-lg font-bold sm:text-2xl">
              Order Confirmation
            </h1>
            <p className="text-gray-600">{moment().format("ll")}</p>
          </div>
        </div>
        {/* Order Status */}
        <div className="bg-white p-6 rounded shadow-md mb-6 text-center border">
          <Image
            unoptimized
            src={cart}
            alt="Order Success"
            className="mx-auto"
            width={150}
            height={150}
          />
          <h2 className="text-2xl font-semibold mt-4">
            {/* {OrderDetailsData?.data?.status === "pending payment"
              ? "Your Payment is pending"
              : OrderDetailsData?.data?.status === "pending" && "Order Placed Successfully"} */}
            Order Placed Successfully
          </h2>
          <p className="text-gray-500">Thanks for being with Jomadder</p>

          <div className="text-center my-5 flex items-center space-x-1 justify-center">
            <Link href="/">
              <Button className="flex items-center bg-green-500 hover:bg-green-400">
                Continue Shopping <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/profile/order">
              <Button className="flex items-center px-14">
                My Order <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        {/* Continue Shopping Button */}
      </div>
    </div>
  );
};

export default Page;
