import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useUpdateStatusMutation } from "@/components/Redux/services/checkout/checkoutAPi";
import { toast } from "react-toastify";
import TableSkeleton from "@/components/all-skeleton/tableSkeleton/TableSkeleton";
import SupportDialog from "../support/SupportDialog";
import Swal from "sweetalert2";

const OrdersTable = ({ data, user, loading, columns }) => {
  const [updateStatus] = useUpdateStatusMutation();

  function getStatusClass(status) {
    const cleanedStatus = status ? status.trim().toLowerCase() : "";

    switch (cleanedStatus) {
      case "payment reviewing":
        return "bg-blue-400 text-white";
      case "pending":
        return "bg-yellow-400 text-white";
      case "processing":
        return "bg-purple-400 text-white";
      case "approved":
        return "bg-green-500 text-white";
      case "imported":
        return "bg-teal-400 text-white";
      case "out-for-delivery":
        return "bg-orange-400 text-white";
      case "delivered":
        return "bg-green-600 text-white";
      case "cancelled":
        return "bg-red-400 text-white";
      case "failed":
        return "bg-red-600 text-white";
      case "on-hold":
        return "bg-indigo-400 text-white";
      case "completed":
        return "bg-green-700 text-white";
      case "pending payment":
        return "bg-yellow-600 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  }

  const handleStatusChange = async (newStatus, itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const payload = { body: { status: newStatus }, id: itemId };
          const res = await updateStatus(payload);
          toast.success("Status Updated Successfully!");
        } catch (error) {
          console.error("Error updating status:", error);
          toast.error("Failed to update status.");
        }
      }
    });
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-white border rounded-md">
      {data.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {columns.map((column, idx) => (
                <TableHead key={idx} className="text-black">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-700 font-medium">
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-800">
                  {item?.orderId ?? item?._id}
                </TableCell>
                <TableCell>
                  {Number(item.price) + Number(item?.charge)}
                </TableCell>
                {/* <TableCell>{item.charge}</TableCell> */}

                <TableCell>
                  {item.status === "pending payment" ? (
                    <span className=" space-x-2">
                      <span className="px-2 py-1 text-white transition bg-red-600 rounded-md hover:bg-red-700 animate-pulse">
                        Pay due {Number(item.price) + Number(item?.charge)} taka
                      </span>
                      <Link
                        href={`/payment?orderId=${item?.orderId}`}
                        className="px-2 py-1 text-white transition bg-primary rounded-md hover:bg-primary/90"
                      >
                        Pay Now
                      </Link>
                    </span>
                  ) : item.transactionId ? (
                    item.transactionId
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/profile/order-details/${item?.orderId}`}>
                    <button className="px-2 py-1 text-gray-500 transition border rounded-md">
                      View Details
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    className={`py-1 px-3 rounded ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </button>
                  {item.status === "pending payment" && (
                    <button
                      onClick={() =>
                        handleStatusChange("cancelled", item?.orderId)
                      }
                      className="ml-2 px-2 py-1 text-red-500 transition border border-red-500 rounded-md"
                    >
                      Cancel
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <SupportDialog orderId={`${item?.orderId}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center p-4">No Orders Available</p>
      )}
    </div>
  );
};

export default OrdersTable;
