"use client";
import React, { useState } from "react";
import OrderTabs from "./OrderTabs";
import { DynamicSelect } from "../../form/DynamicSelect";
import DashboardTable from "./DashboardTable";

const DashboardView = ({
  title,
  data = [],
  tabOptions = [],
  filterOptions,
  tabEnabled,
  transactionColumns,
  allTransactionColumns,
  type,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState(tabOptions[0]?.name || "all");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const columns =
    type === "transaction" ? transactionColumns : allTransactionColumns;

  const ITEMS_PER_PAGE = 10;

  // Filter Data
  const filteredData = data.filter((item) => {
    const itemStatus = item.status?.toLowerCase() || "";
    const isStatusMatched =
      (!filterStatus && activeTab === "all") ||
      (filterStatus && itemStatus === filterStatus.toLowerCase()) ||
      (activeTab !== "all" && itemStatus === activeTab.toLowerCase());
    const isIdMatched = !searchId || item.transactionId?.includes(searchId);

    return isStatusMatched && isIdMatched;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleSearch = () => setCurrentPage(1);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilterStatus("");
    setSearchId("");
    setCurrentPage(1);
  };

  return (
    <div className="p-4 mx-auto">
      {/* <h2 className="mb-4 text-xl font-semibold">{title}</h2> */}

      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between mb-4">
        {/* Filter Dropdown */}
        <DynamicSelect
          options={filterOptions}
          placeholder="Filter By Status"
          className="md:w-1/2 w-full"
          onValueChange={(selectedValue) => {
            setFilterStatus(selectedValue);
            setCurrentPage(1);
          }}
        />

        {/* Search Input */}
        <div className="flex mb-3 md:mb-0">
          <input
            type="text"
            placeholder="Filter By Id"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="p-[10px] border border-gray-300 rounded-l-md focus:outline-none w-[80%]"
          />
          <button
            className="px-4 py-[10px] text-white bg-primary rounded-r-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Tabs */}
      {tabEnabled && (
        <OrderTabs
          options={tabOptions}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      )}

      {/* Table */}
      <DashboardTable
        data={currentItems}
        columns={columns}
        dataKey={type}
        loading={loading}
      />

      {/* Pagination */}
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

export default DashboardView;
