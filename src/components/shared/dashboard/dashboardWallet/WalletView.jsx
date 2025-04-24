"use client";
import React, { useState } from "react";
import WalletTable from "./WalletTable";
import DynamicModal from "../../modal/DynamicModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WalletView = ({
  title,
  data = [],
  tabOptions = [],
  walletColumns,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState(tabOptions[0]?.name);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Use conditional logic to select columns and data key based on "orders" or "allorders"
  const ITEMS_PER_PAGE = 10;

  const filteredData = data.filter((item) => {
    // console.log("Item:", item); // Log each item to inspect structure and values
    const itemStatus = item.status ? item.status.toLowerCase() : "";
    const activeTabLower = activeTab ? activeTab.toLowerCase() : "";
    const filterStatusLower = filterStatus ? filterStatus.toLowerCase() : "";

    const matchesStatus =
      (filterStatusLower === "" && activeTabLower === "all") ||
      (filterStatusLower && itemStatus === filterStatusLower) ||
      (activeTabLower && itemStatus === activeTabLower);

    const matchesId = searchId ? (item._id || "").includes(searchId) : true;

    return matchesStatus && matchesId;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="md:p-5 p-3 mx-auto">
      <div className="flex justify-between my-3">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        <DynamicModal
          trigger="Apply For Credit"
          long={false}
          wide="w-[400px]" 
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold my-2">Credit Application</h3>
            <Label>Your Name</Label>
           <Input className='' placeholder='hello'/>
          </div>
        </DynamicModal>
      </div>

      {/* Table Display */}
      <WalletTable
        data={currentItems}
        loading={loading}
        columns={walletColumns}
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

export default WalletView;
