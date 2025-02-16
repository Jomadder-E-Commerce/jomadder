"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import TableSkeleton from "@/components/all-skeleton/tableSkeleton/TableSkeleton";

const UserSupportTable = ({
  data,
  loading: isLoading,
  onStatusChange, 
  onResolveSupport,
}) => {
  console.log(data)
  const getButtonClass = (status) => {
    const cleanedStatus = status ? status.trim() : "";
    if (cleanedStatus === "pending") {
      return "bg-green-400 text-white";
    } else if (cleanedStatus === "rejected") {
      return "bg-red-400 text-white";
    } else if (cleanedStatus === "processing") {
      return "bg-blue-400 text-white";
    } else {
      return "bg-orange-500 text-white";
    }
  };

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="bg-white border rounded-md">
      {data.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-black">Support_Id</TableHead>
              <TableHead className="text-black">Order Details</TableHead>
              <TableHead className="text-black">Time</TableHead>
              <TableHead className="text-black">Status</TableHead>
              <TableHead className="text-black">View Details</TableHead>
              <TableHead className="text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item?.userId?._id}
                </TableCell>
                <TableCell>
                  <Link href={`/profile/order-details/${item?.orderId?._id}`}>
                    <button className="px-3 py-1 text-gray-500 transition border rounded-md">
                      View Details
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <button className="text-gray-500 transition text-center rounded-md">
                    {moment(item?.createdAt).calendar()}
                  </button>
                </TableCell>
                <TableCell>
                {/* <DropdownMenu>
                      <DropdownMenuTrigger className="focus:border-none focus:outline-none"> */}
                        <button className={`px-3 py-1 border rounded-md ${getButtonClass(item?.status)} focus:outline-none`}>
                          {item?.status}
                        </button>
                      {/* </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border rounded-md focus:outline-none outline-none">
                        {["pending", "rejected", "approved","processing"].map(
                          (statusOption) => (
                            <DropdownMenuItem
                              key={statusOption}
                              onSelect={() => onStatusChange(statusOption,item?._id )}
                              className="cursor-pointer hover:bg-gray-100 p-2 focus:outline-none outline-none"
                            >
                              {statusOption}
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                </TableCell>
                <TableCell>
                  <Link href={`/profile/support/${item?._id}`}>
                    <button className="px-3 py-1 text-gray-500 transition border rounded-md">
                      View Details
                    </button>
                  </Link>
                </TableCell>
                <TableCell className="flex gap-2">
                    {/* Dropdown for changing status */}


                    {/* Resolve Support Button */}
                    {
                      item?.resolve ?  <button
                     
                      className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Resolved
                    </button>: <button
                      onClick={() => onResolveSupport(item._id)}
                      className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Resolve
                    </button>
                    }
                   
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-4 text-center">
          <p>No data available.</p>
        </div>
      )}
    </div>
  );
};

export default UserSupportTable;
