"use client";
import React, { useState } from "react";
import { DynamicSelect } from "../../form/DynamicSelect";
import TransactionsTable from "./TransactionsTable";
import SidebarText from "../../Siderbar/SidebarText";

const MyTransactionsView = ({
  title,
  data = [],
  filterOptions,
  myTransactionColumns,
  loading,
}) => {
  const [filterStatus, setFilterStatus] = useState("All Transaction");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Filter data based on status and ID
  const filteredData = data.filter((item) => {
    const itemStatus = item.status ? item.status.toLowerCase() : "";
    const filterStatusLower = filterStatus ? filterStatus.toLowerCase() : "";

    const matchesStatus =
      filterStatusLower === "all transaction" || // New condition
      filterStatusLower === "" ||
      itemStatus === filterStatusLower;

    const matchesId =
      searchId === "" || 
      (item._id.toString().includes(searchId.trim()) || item.orderId?._id.toString().includes(searchId.trim()));

    return matchesStatus && matchesId;
  });


  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };
  
  

  return (
    <div className="md:p-5 p-3 mx-auto">
        {/* <h2 className="mb-4 text-xl font-semibold">{title}</h2> */}
        <SidebarText text="My Transactions"/>
        <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between mb-4">
          {/* Filter Dropdown */}
          <DynamicSelect
            options={filterOptions}
            placeholder={"Filter By Status"}
            className={"md:w-1/2 w-full h-9"}
            onValueChange={(selectedValue) => {
              setFilterStatus(selectedValue);
              setCurrentPage(1);
            }}
          />

          {/* Search Input and Button */}
          <div className="flex mb-3 md:mb-0">
            <input
              type="text"
              placeholder={"Filter By Id"}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="p-[8px] border border-gray-300 rounded-l-md focus:outline-none w-[80%]"
            />
            <button
              className="px-4 py-[9px] text-white bg-primary rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Table Display */}
        <TransactionsTable
          data={currentItems}
          loading={loading}
          columns={myTransactionColumns}
        />

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1 ? "bg-gray-200" : "bg-white"
            }`}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages ? "bg-gray-200" : "bg-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default MyTransactionsView;
