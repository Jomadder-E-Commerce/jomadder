"use client";
import React, { useState } from "react";
import { DynamicSelect } from "@/components/shared/form/DynamicSelect";
import { useUpdateSingleSupportMutation } from "@/components/Redux/services/support/supportApi";
import { filterData } from "@/lib/filteredData";
import DynamicSearchInput from "@/components/shared/form/DynamicSearchInput";
import UserSupportTable from "./UserSupportTable";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SidebarText from "@/components/shared/Siderbar/SidebarText";

const UserSupport = ({
  title,
  data = [],
  tabOptions = [],
  filterOptions,
  transactionColumns,
  allTransactionColumns,
  type,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState(tabOptions[0]?.name || "all");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updateSingleSupport] = useUpdateSingleSupportMutation()
  const columns =
    type === "transaction" ? transactionColumns : allTransactionColumns;

  const ITEMS_PER_PAGE = 10;

  const filteredData = filterData(data, filterStatus, searchId, 'orderId.OrderPhone', 'status', 'all status');

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const onStatusChange = async (status, id) => {
    try {
      const body = { status: status, id: id }
      const tryUpdate = await updateSingleSupport(body);
      // console.log(tryUpdate)
    }
    catch (error) {
      console.log(error)
    }

  }
  const onResolveSupport = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, resolve it!",
        cancelButtonText: "Not resolve",
      }).then(async(result) => {
        if (result.isConfirmed) {
          try{
            const body = { resolve: true, id: id };
            const tryUpdate = await updateSingleSupport(body);
            toast.success("Support Request Resolved");
          } catch{
            toast.error(error.message || "An error occurred!");
          }
        }
      });
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="p-4 mx-auto">
      {/* <h2 className="mb-4 text-xl font-semibold">{title}</h2> */}
      <SidebarText text="Support Inbox"/>
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between mb-4">
        {/* Filter Dropdown */}
        <DynamicSelect
          options={filterOptions}
          placeholder="Filter By Status"
          className="md:w-1/2 w-full h-9"
          onValueChange={(selectedValue) => {
            setFilterStatus(selectedValue);
            setCurrentPage(1);
          }}
        />

        {/* Search Input */}
        <DynamicSearchInput onChange={(e) => setSearchId(e.target.value)} placeholder="Search By Phone" searchId={searchId} />

      </div>

      {/* Table */}
      <UserSupportTable
        data={currentItems}
        columns={columns}
        dataKey={type}
        loading={loading}
        onStatusChange={onStatusChange}
        onResolveSupport={onResolveSupport}
      />

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${currentPage === 1 ? "bg-gray-200" : "bg-white"
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
          className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? "bg-gray-200" : "bg-white"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserSupport;