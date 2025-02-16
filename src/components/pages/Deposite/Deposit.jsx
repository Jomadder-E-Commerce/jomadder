"use client"
import React, { useState } from 'react';
import DepositAdd from './DepositAdd';
import DepositTable from './DepositTable';
import { useGetMydepsitQuery } from '@/components/Redux/services/depositApi/depositApi';
import SidebarText from '@/components/shared/Siderbar/SidebarText';

const Deposite = () => {
  const [searchId, setSearchId] = useState("");

  // Fetch deposit data from Redux
  const { data: depositData, isLoading } = useGetMydepsitQuery();

  const columns = [
    { label: "Deposit Id", key: "_id" },
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status", type: "button" },
    { label: "Slip", key: "details", type: "button" },
  ];

  // Filter data based on the searchId
  const filteredData = depositData?.data.filter(item =>
    item._id.toLowerCase().includes(searchId.toLowerCase())
  ) || null;

  return (
    <div className="container mx-auto py-10"> 
    <SidebarText text="My Deposit"/>
      <div className="flex justify-between items-center w-full sm:flex-row flex-col">
        {/* Search option for searching depobasesit by id */}
        <div className="flex mb-3 md:mb-0 h-[40px]">
          <input
            type="text"
            placeholder={"Filter By Id"}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="p-[8px] border border-gray-300 rounded-l-md focus:outline-none w-[80%]"
          />
          <button
            className="px-4 py-[9px] text-white bg-primary rounded-r-md"
            onClick={() => console.log(`Search Triggered: ${searchId}`)}
          >
            Search
          </button>
        </div>
        {/* Deposit creation */}
        <DepositAdd />
      </div>

      <div className="mt-10">
        {/* Pass filtered data to DepositTable */}
        <DepositTable data={filteredData} isLoading={isLoading} columns={columns} />
      </div>
    </div>
  );
};

export default Deposite;
