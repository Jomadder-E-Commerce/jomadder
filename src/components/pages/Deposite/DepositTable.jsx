import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';


const DepositTable = ({data,isLoading}) => {
    const [slip,setSlip] = useState(null)
      const [isModalOpen, setIsModalOpen] = useState(false); 
    const getButtonClass = (status) => {
        const cleanedStatus = status ? status.trim() : ""; 
        if (cleanedStatus === "pending") {
          return "bg-blue-400 text-white"; 
        } else if (cleanedStatus === "cancelled") {
          return "bg-red-400 text-white"; 
        } else if (cleanedStatus === "approved") {
          return "bg-green-400 text-white"; 
        } else {
          return "bg-gray-300 text-black";
        }
      };
      const handleViewDetails = (image) => {
        setSlip(image); 
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false); 
        setSlip(null);
      };
      const columns =  [
        { label: "Deposit Id", key: "depositId" },
        { label: "Date", key: "date" },
        { label: "Amount", key: "amount" },
        { label: "Status", key: "status", type: "button" },
        { label: "Slip", key: "details", type: "button" },
      ];
    return (
        <div className="bg-white border rounded-md">


          {
            data?.length == 0 ? <div className="w-full py-4 bg-white mx-auto flex justify-center items-center">No data found</div> :    <Table>
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
                {           
                data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell>{moment(item?.createdAt).format("DD-MM-YYYY")}</TableCell>
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
                      View Slip
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            
  
            </TableBody>
            </Table>
          }
                           {
            isLoading && <div className="w-full py-4 bg-white mx-auto flex justify-center items-center">Loading...</div>
          }
           {isModalOpen && (
                  <div className="fixed z-[200] inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto ">
                    <div className="bg-white p-6 rounded-md max-w-md w-full max-h-[800px]">
                      <h2 className="text-xl font-bold mb-4">Slip Image</h2>
                      {slip ? (
                        <Image  height={400}
                        width={400} unoptimized src={slip} alt="Slip" className="w-full h-auto border rounded-md" />
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

export default DepositTable;