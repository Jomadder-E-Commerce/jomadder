"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { ImageHosting } from "@/components/shared/Cloudinary";
import { useConvertImageMutation } from "@/components/Redux/services/imageApi/imageApi";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const textList = [
  "Search by link",
  "Search by keyword",
  "Search by image",
];

const Search = ({loading, setLoading}) => {
  const path = usePathname();
  const [image, setImage] = useState(null);
  const [convertImage] = useConvertImageMutation();
  const [placeholder, setPlaceholder] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const click = () => {
    document.getElementById("type3-1").click();
  };

  const handleFileChange = async (e) => {
    // Start loading (image upload in progress)
    setLoading(true);
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (file) {
        const uploadedImage = await ImageHosting(file);
        const photo = uploadedImage?.url;
        const conversation = await convertImage({ uri: photo });
        const convertedImage = conversation?.data?.data?.data?.image_url;

        if (convertedImage) {
          setImage(convertedImage);
          const encodeUri = encodeURIComponent(convertedImage);
          window.location.href = `/searchImage/${encodeUri}`;
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const CheckingDataType = async () => {
    if (!text) return;
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

    if (urlRegex.test(text)) {
      SeeProductDependsOnLink(text);
    } else {
      SeeProductDependsOnText(text);
    }
  };

  const SeeProductDependsOnLink = async (text) => {
    const productIdRegex = /\b\d{12}\b/;
    const match = text.match(productIdRegex);
    if (!match) {
      toast("Please give a proper link");
    } else {
      window.location.href = `/product-details/${match[0]}`;
    }
  };

  const SeeProductDependsOnText = async (text) => {
    window.location.href = `/all-product?q=${text}`;
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      CheckingDataType();
    }
  };

  // Cycle through the placeholder texts every 5 seconds only if no input is provided and no image upload is in progress.
  useEffect(() => {
    if (text !== "" || loading) return;
    const interval = setInterval(() => {
      setPlaceholder((prev) => (prev + 1) % textList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [text, loading]);

  return (
    <>
     {loading && (
        <div className="fixed inset-0 z-[300] h-[100vh] flex items-center justify-center bg-black bg-opacity-70">
          {/* A simple spinner using Tailwind CSS */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      )}
    <div className="flex flex-row items-center w-full">
      <div className="w-full relative transition-all duration-300 flex items-center group border-[2px] hover:border-primary focus-within:border-primary bg-white rounded-md rounded-r-none px-3 gap-2 border-r-0">
        <div
          onClick={click}
          className="text-gray-500 z-10 transition-all duration-300 cursor-pointer border-r-[2px] group-hover:border-primary group-focus-within:border-primary h-[40px] flex items-center pr-3"
        >
          <label className="w-max text-primary">
            <FaCamera className="text-lg" />
          </label>
          <input
            onChange={handleFileChange}
            className="hidden"
            type="file"
            id="type3-1"
          />
        </div>

        {/* Animated placeholder overlay */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {text === "" && (
              <motion.span
                key={loading ? "image-progress" : textList[placeholder]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="absolute top-2 transform flex justify-center items-center pointer-events-none text-gray-400"
              >
                {loading ? "Image search progress..." : textList[placeholder]}
              </motion.span>
            )}
          </AnimatePresence>
          <input
            className="w-full focus:outline-none py-2 text-black"
            type="text"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleEnterKeyPress}
            value={text}
          />
        </div>
      </div>

      <div
        onClick={CheckingDataType}
        className={`cursor-pointer bg-primary rounded-md rounded-l-none border-2 text-white ${
          loading ? "px-2 py-2" : "px-3 py-3"
        } flex items-center border-primary`}
      >
        {loading ? (
          <div className="w-6 h-6 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-white"></div>
        ) : (
          <FaSearch />
        )}
      </div>
    </div>
    
    </>
    
  );
};

export default Search;
