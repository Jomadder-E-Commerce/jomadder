"use client";
import { FaTruckMoving, FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import React from "react";
import OrdersView from "./OrdersView";
import { useGetCheckoutQuery } from "@/components/Redux/services/checkout/checkoutAPi";

const MyOrders = () => {
  const { data } = useGetCheckoutQuery();
  const orderColumns = [
    { label: "Order Id", key: "orderId" },
    { label: "Amount", key: "price" },
    // { label: "Charge", key: "charge" },
    // { label: "District", key: "district" },


    { label: "Transaction Id", key: "TransactionId" },
    { label: "Details", key: "details", type: "button" },
    { label: "Status", key: "Status" },
    { label: "Support", key: "support", type: "button" },
  ];
  return (
    <div>
      <OrdersView
        title={"My Orders"}
        data={data?.data || []}
        ordersColumns={orderColumns}
        filterOptions={[  "all orders",
          "pending payment",
          "payment reviewing",
          "pending",
          "processing",
          "approved",
          "imported",
          "out-for-delivery",
          "delivered",
          "cancelled",
          "failed",
          "on-hold",
          "completed",

        ]}
        searchPlaceholder={"Filter By Status"}
      />
    </div>
  );
};

export default MyOrders;
