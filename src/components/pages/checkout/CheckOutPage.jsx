"use client";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutOrder from "./CheckoutOrder";
import PayCard from "@/components/PaymentPage/PayCard";
import { useGetCartListQuery } from "@/components/Redux/services/cartApi";
import moment from "moment";
import { getDataFromLocalStorage } from "@/utils/localstorage";

const CheckOutPage = () => {
  // const { data, isLoading } = useGetCartListQuery();
  const [data,setData] = useState([])
  useEffect(()=>{

    const StorageData = getDataFromLocalStorage("cart") || [];
    const Filtered = StorageData.filter((item) => item.checked == true);
    setData(Filtered)
  },[])
  const [buyNowData, setBuyNowData] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("buyNowData");
    if (storedData) {
      setBuyNowData(JSON.parse(storedData));
      // localStorage.removeItem("buyNowData");
    }
  }, []);
  const checkoutData = buyNowData || data;
  return (
    <div className="container">
      <div className=" pb-10   pt-4">
        <div className="p-4 mb-6 bg-white rounded-md shadow-md border">
          <div className="items-center justify-between pb-4 text-sm text-center border-b sm:flex sm:text-start ">
            <h1 className="font-bold sm:text-2xl ">CHECKOUT</h1>
            <p className="text-gray-600 sm:text-md ">{moment().format('LL')}</p>
          </div>
        </div>
        <div className="justify-center gap-5 my-5 lg:flex">
          <div className="space-y-4  w-full">
            <div className="flex-1">
              <CheckoutForm />
              <PayCard product={checkoutData}/>
            </div>
            {/* <CartProduct /> */}
          </div>
          <CheckoutOrder data={checkoutData} />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
