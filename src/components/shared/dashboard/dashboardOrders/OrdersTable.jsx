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

  const getButtonClass = (status) => {
    const cleanedStatus = status ? status.trim() : "";
    if (cleanedStatus === "pending") {
      return "bg-green-600 text-white";
    } else if (cleanedStatus === "cancelled") {
      return "bg-red-600 text-white";
    } else if (cleanedStatus === "pending payment") {
      return "bg-blue-600 text-white";
    } else {
      return "bg-gray-600 text-black";
    }
  };

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
          <TableBody className="text-gray-500">
            {data.map((item, index) => (
              <TableRow key={index}>
<TableCell>{item?._id}</TableCell>
                <TableCell>{Number(item.price) + Number(item?.charge)}</TableCell>
                {/* <TableCell>{item.charge}</TableCell> */}
                
               
                <TableCell>
                  <button
                    className={`py-1 px-3 rounded ${getButtonClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </button>
                  {
                    item.status === "pending payment" && (
                    <button
                      onClick={() => handleStatusChange("cancelled", item._id)}
                      className="ml-2 px-2 py-1 text-red-500 transition border border-red-500 rounded-md"
                    >
                      Cancel
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/profile/order-details/${item._id}`}>
                    <button className="px-2 py-1 text-gray-500 transition border rounded-md">
                      View Details
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  {item.status === "pending payment" ? (
                    <Link
                      href={`/payment?orderId=${item?._id}`}
                      className="px-2 py-1 text-white transition bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Complete Payment
                    </Link>
                  ) : item.transactionId ? (
                    item.transactionId
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <SupportDialog orderId={`${item._id}`} />
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
