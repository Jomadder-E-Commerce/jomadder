"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useRef } from "react";

export default function LeftBanner({ isLoading, data }) {
  const swiperRef = useRef(null); // Create a ref for Swiper

  if (isLoading) {
    return (
      <Skeleton className="h-[160px] md:h-80 xl:h-[calc(100vh-300px)] max-h-[600px] lg:w-8/12 w-full bg-slate-200 block md:hidden" />
    );
  }

  return (
    <div className="relative group h-full">
      {/* Swiper Slider */}
      <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper w-full h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
      >
        {data?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              priority
              height={500}
              width={1500}
              src={image?.bannerImage}
              alt={`Banner Image ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Previous Button */}
      <button
        className="absolute top-1/2 left-0 z-10 text-white py-2 sm:rounded-l-lg rounded-none transform -translate-y-1/2 hover:bg-primary transition opacity-100 h-full"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaCaretLeft className="text-2xl" />
      </button>

      {/* Custom Next Button */}
      <button
        className="absolute top-1/2 right-0 z-10 text-white py-2 sm:rounded-r-lg rounded-none transform -translate-y-1/2 hover:bg-primary transition opacity-100 h-full"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaCaretRight className="text-2xl" />
      </button>
    </div>
  );
}
