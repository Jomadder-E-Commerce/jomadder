"use client";
import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/bundle";
import ProductSliderSkeleton from "@/components/all-skeleton/ProductSkeleton/ProductSliderSkeleton";
import ShopDetailsBar from "./shopDetails/ShopDetailsBar";
import { FaPlay } from "react-icons/fa";
const ProductSlider = ({ productData, isError, isLoading, selectedImage, handleChooseImage, type, setType }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);
  if (isLoading) {
    return <ProductSliderSkeleton />;
  }
  if (isError) {
    return <p>Error loading product images.</p>;
  }

  const video = productData?.video_url;


  const handleFewthings = (image) => {
    handleChooseImage(image);
    setType("video");
  };

  const handleImage = (image) => {
    setType("image");
    handleChooseImage(image);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
    setZoomed(true);
  };

  const handleMouseLeave = () => {
    setZoomed(false);
  };

  return (
    <div className="w-full">
      <div className="block">
        {productData?.main_imgs.length > 0 ? (
          <div className="relative rounded-md flex items-center justify-center w-full overflow-hidden">
            {type === "video" ? (
              <video
                controls
                autoPlay
                loop
                className="object-cover  rounded-lg object-center w-full md:h-[400px] sm:h-[300px] h-[200px]"
                src={selectedImage}
              />
            ) : (
              <div
                className="relative w-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  unoptimized
                  src={selectedImage ? selectedImage : productData?.main_imgs[0]}
                  width={1000}
                  height={1200}
                  loading="lazy"
                  className="cursor-pointer object-cover  rounded-lg object-center h-full w-full  md:max-h-[600px] sm:max-h-[400px] max-h-[400px]"
                  alt="Product Image"
                />
                {zoomed && (
                  <span
                    className="zoom-lens"
                    style={{
                      backgroundImage: `url(${selectedImage ? selectedImage : productData?.main_imgs[0]})`,
                      backgroundSize: "240% 240%", // Zoom effect
                      backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No images available.</p>
        )}

        <div className="gap-2.5 justify-start my-2.5 grid grid-cols-4 md:grid-cols-6 w-full">
  {/* Video Thumbnail */}
  {video && (
        <div
          className="relative rounded-md w-full border hover:border-blue-900 cursor-pointer overflow-hidden"
          onClick={() => handleFewthings(video)}
        >
          {/* Thumbnail Preview */}
          <video
            className="object-cover border rounded-lg object-center max-h-[60px] h-full w-full"
            src={video}
            muted
            loop
            playsInline
          ></video>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button className="bg-white text-black rounded-full p-2 shadow-lg"><FaPlay className="text-[12px]" /></button>
          </div>
        </div>
      )}

          {productData?.main_imgs.length > 0 &&
            productData?.main_imgs.map((imageUrl, idx) => (
              <div
                key={idx}
                className="rounded-md w-full border max-h-[60px] hover:border-blue-900 cursor-pointer overflow-hidden"
                onClick={() => handleImage(imageUrl)}
              >
                <Image
                  unoptimized
                  src={imageUrl}
                  width={60}
                  height={40}
                  loading="lazy"
                  className="object-cover object-center h-full max-h-[60px] w-full"
                  alt={`Product Thumbnail ${idx + 1}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
