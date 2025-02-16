"use client";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetSingleSupportQuery } from "@/components/Redux/services/support/supportApi";
import Link from "next/link";
import SupportSkeleton from "./SupportSkeleton";
import avatar from "@/assets/profile/Avatar.jpg"

const Support = () => {
  const {id} = useParams()
  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const {data:singleSupport,isLoading} = useGetSingleSupportQuery(id) 
  const singleData = singleSupport?.data
  console.log(singleData)
  // Placeholder data


  // Determine grid columns based on the number of photos
  const statusColors = {
    "processing": "bg-yellow-500",
    "approved": "bg-green-500",
    "rejected": "bg-red-500",
    "pending": "bg-blue-500"
  }
  if(isLoading){
    return(
    <SupportSkeleton/>
    )
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
    <h1 className="text-3xl font-bold">Support Request</h1>
    
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">Request {singleData?._id}</span>
        <span className={`px-2 py-1 rounded-full text-white text-sm ${statusColors[singleData?.status]}`}>
          {singleData?.status}
        </span>
      </div>
      
      <div className="border-t pt-4">
        <h2 className="font-semibold mb-2">User Message:</h2>
        <p>{singleData?.text}</p>
      </div>
      
      <div className="border-t pt-4">
        <h2 className="font-semibold mb-2">User Submitted Images:</h2>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {singleData?.image?.map((img, index) => (
            <Image 
              key={index} 
              src={img} 
              alt={`User submitted image ${index + 1}`} 
              width={200} 
              height={200} 
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <div className="flex items-center space-x-4">
        <Image 
          src={singleData?.userId?.photo || avatar} 
          alt={singleData?.userId?.name} 
          width={64} 
          height={64} 
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{singleData?.userId?.name}</p>
          <p className="text-gray-500">{singleData?.userId?.email}</p>
        </div>
      </div>
    </div>
   <Link href={`/dashboard/order-details/${singleData?.orderId?._id}`}>
   <button 
 
className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"

>
View Related Order
</button>
   
   </Link>

  </div>
  );
};

export default Support;
