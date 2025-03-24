"use client";
import { FaTruckMoving, FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import React from "react";
import OrdersView from "./OrdersView";
import { useGetCheckoutQuery } from "@/components/Redux/services/checkout/checkoutAPi";

const MyOrders = () => {
  const { data } = useGetCheckoutQuery();
  const orderColumns = [
    { label: "OrderId", key: "orderId" },
    { label: "Amount", key: "price" },
    // { label: "Charge", key: "charge" },
    // { label: "District", key: "district" },

    { label: "Details", key: "details", type: "button" },
    { label: "TransactionId", key: "TransactionId" },
    { label: "Status", key: "Status" },
    { label: "Support", key: "support", type: "button" },
  ];
  return (
    <div>
      <OrdersView
        title={"My Orders"}
        data={data?.data || []}
        ordersColumns={orderColumns}
        filterOptions={["payment reviewing", "cancelled", "completed", "delivered"]}
        searchPlaceholder={"Filter By Status"}
      />
    </div>
  );
};

export default MyOrders;
