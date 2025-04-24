"use client"
import Image from "next/image";
import { useState } from "react";
import ShopDetailsForDetails from "./shopDetails/ShopDetailsForDetails";
import Reviews from "./Reviews/Reviews";
import DetailsSkeleton from "@/components/shared/skeleton/DetailsSkeleton";
import ReviewSkeleton from "@/components/shared/skeleton/ReviewSkeleton";

export default function DetailsTab({ productData, isLoading }) {
  const [activeTab, setActiveTab] = useState("Specification");

  const description = productData?.title;

  const tabs = [
    "Specification",
    "Shop",
    "Reviews", //if reviews available
    "Original Images",
  ];
  const getKeyByValue = (object, value) => {
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] == value) {
          return prop;
        }
      }
    }
  };


  return (
    <div className=" bg-white  rounded-md mb-10">
      <div className="sm:flex gap-2 justify-center  grid grid-cols-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold border-2 ${
              activeTab === tab
                ? "border-b-2 bg-blue-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 min-h-screen">
        {activeTab === "Specification" && (
          <div>{
            isLoading ? <DetailsSkeleton/> :    <div className="border rounded-md overflow-hidden">
            {productData?.product_props?.map((spec, index) => (
              <div
                key={index + spec}
                className={`flex ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } `}
              >
                {Object.entries(spec)?.map(([key, value]) => (
                  <>
                    <div className="w-1/2 p-3 border-r border-b">
                     {key}
                    </div>
                    <div className="w-1/2 p-3 border-b">
                     {value}
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>}</div>
          
       
        )}
        {
          activeTab == "Original Images" && <div className="flex flex-col gap-2">
           {
              productData?.main_imgs?.map((item, key) => <Image unoptimized src={item} className="w-full h-auto" alt={`image${key}`} key={key} width={1000} height={1000} />)
           }
          </div>
        }
                {
          activeTab == "Shop" && <ShopDetailsForDetails id={productData?.item_id}/>
        }
        {
          activeTab == "Reviews" && <div>
            
           
                <Reviews id={productData?.item_id}/> 
            
            
            </div>
        }
      </div>
    </div>
  );
}
