import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import TableSkeleton from "@/components/all-skeleton/tableSkeleton/TableSkeleton";

const WalletTable = ({ data, loading, columns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slipImage, setSlipImage] = useState(null);

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

  const handleViewDetails = (image) => {
    setSlipImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSlipImage(null);
  };

  if (loading) {
    return <TableSkeleton/>;
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
                <TableCell>{item.transactionId}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <button
                    className={`py-1 px-3 rounded ${getButtonClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleViewDetails(item.slip)}
                    className="px-2 py-1 text-gray-500 transition border rounded-md"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="p-4 text-center">No data available.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Slip Image</h2>
            {slipImage ? (
              <Image unoptimized  
                height={400}
                width={400}
                src={slipImage}
                alt="Slip"
                className="w-full h-auto border rounded-md"
              />
            ) : (
              <p className="text-center text-gray-500">No Slip Image</p>
            )}
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletTable;
