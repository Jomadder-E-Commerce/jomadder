'use client'
import { useGetUserDashboardQuery } from "@/components/Redux/services/userApi";
import { Clock, Package, CheckCircle, XCircle } from "lucide-react";
import SidebarText from "../../shared/Siderbar/SidebarText";

const UserDashboard = () => {
  const { data , isLoading} = useGetUserDashboardQuery();

  const statusCounts = {
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
  };
  console.log(data)
  if (data?.data) {
    data.data.map((item) => {
      if ((item._id === "on-hold" || item._id === "pending") || item._id == "pending payment") statusCounts.pending += item.count;
      if ((item._id === "processing" || item._id == "approved") || (item._id == "imported" || (item._id == "out-for-delivery" || item._id == "delivered"))) statusCounts.processing = item.count;
      if (item._id === "completed" ) statusCounts.completed = item.count;
      if (item._id === "cancelled" || item._id === "failed") statusCounts.cancelled = item.count;
    });
  }

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-semibold mb-4">Overview</h2> */}
      {/* <div className="text-2xl font-semibold mb-4 md:block hidden">
        Overview
      </div> */}
      <SidebarText text="Overview"/>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Orders */}
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col justify-center items-center">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{statusCounts.pending}</div>
          <div className="text-gray-600">Pending</div>
        </div>

        {/* Processing Orders */}
        <div className="bg-yellow-50 p-4 rounded-lg flex flex-col justify-center items-center">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Package className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{statusCounts.processing}</div>
          <div className="text-gray-600">Processing</div>
        </div>

        {/* Completed Orders */}
        <div className="bg-green-50 p-4 rounded-lg flex flex-col justify-center items-center">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{statusCounts.completed}</div>
          <div className="text-gray-600">Completed</div>
        </div>

        {/* Cancelled Orders */}
        <div className="bg-red-50 p-4 rounded-lg flex flex-col justify-center items-center">
          <div className="flex items-center justify-between mb-2 ">
            <div className="bg-red-100 p-2 rounded-full ">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{statusCounts.cancelled}</div>
          <div className="text-gray-600">Cancelled</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
