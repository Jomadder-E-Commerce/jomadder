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
import Link from "next/link";
import SupportDialog from "../support/SupportDialog";

const DashboardTable = ({
  data,
  columns,
  dataKey,
  user,
  loading: isLoading,
}) => {
  const getButtonClass = (status) => {
    const cleanedStatus = status ? status.trim() : "";
    if (cleanedStatus === "pending") {
      return "bg-green-400 text-white";
    } else if (cleanedStatus === "rejected") {
      return "bg-red-400 text-white";
    } else if (cleanedStatus === "payment reviewing") {
      return "bg-blue-400 text-white";
    } else {
      return "bg-gray-300 text-black";
    }
  };
  if (isLoading) {
    return <p>Loading data...</p>; // Ensure this returns a loading message.
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
              {user && <TableHead className="text-black">User Info</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column, idx) => (
                  <TableCell key={idx}>
                    {column.type === "button" ? (
                      <button
                        className={`py-1 px-3 rounded ${getButtonClass(
                          item[column.key]
                        )}`}
                      >
                        {item[column.key]}
                      </button>
                    ) : (
                      item[column.key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Link href={`/${dataKey}/details/${item.id}`}>
                    <button className="px-3 py-1 text-gray-500 transition border rounded-md">
                      View Details
                    </button>
                  </Link>
                </TableCell>
                {user && (
                  <TableCell>
                    <Link href={`/${dataKey}/user-info/${item.userId}`}>
                      <span className="text-blue-600">{user.name}</span>
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-4 text-center">
          <p>No data available. </p>
          {/* <SupportDialog /> */}
        </div> 
      )}
    </div>
  );
};

export default DashboardTable;
