"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import './BannerSlider.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./BannerSlider.css";


// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function RightBanner({isLoading,data}) {
  // const {data} = useGetTosideBannerQuery();
  // const rightImage1 = data?.data[0]?.bannerImage;
console.log(data?.data)
  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full mySwiper"
        // style={{ position: 'relative' }} // Lower z-index than the navigation
      >
        {data?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image unoptimized src={image?.bannerImage} width={800} height={450} alt={`Promotion ${index + 1}`} className=" object-center w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
