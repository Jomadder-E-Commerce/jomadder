"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { ImageHosting } from "@/components/shared/Cloudinary";
import {
  useConvertImageMutation,
  useFindProductByImageMutation,
} from "@/components/Redux/services/imageApi/imageApi";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { compressImage } from "@/utils/compressImageFile";
import { useDispatch } from "react-redux";
import { setSearchByImageProducts } from "@/components/Redux/features/AllSlice/searchByImageSlice";
import { setLocalStorage } from "../LocalStorage/LocalStorage";
import SearchLoader from "../loader/SearchLoader";
import { Sparkles } from "lucide-react";

const textList = ["Search by link", "Search by keyword", "Search by image"];

const Search = ({ loading, setLoading }) => {
  const [placeholder, setPlaceholder] = useState(0);
  const [text, setText] = useState("");
  const [findProductByImage] = useFindProductByImageMutation();

  const dispatch = useDispatch();

  const router = useRouter();

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
        const compressedFile = await compressImage(file);
        const formData = new FormData();
        formData.append("file", compressedFile);

        const data = await findProductByImage(formData).unwrap();

        const imageUri = data?.data?.imageUri?.data?.image_url;

        if (imageUri) {
          setLocalStorage("search-image_uri", imageUri);
        }

        dispatch(setSearchByImageProducts(data?.data?.data?.data?.items || []));

        router.push(`/searchByImage`);

        // const encodeUri = encodeURIComponent(convertedImage);

        // router.push(`/searchImage/${encodeUri}`);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const parsedUrl = new URL(window.location.href || "");

    // Access the search parameters
    const params = new URLSearchParams(parsedUrl.search);

    // Get the value of 'q'
    const qValue = params.get("q");
    if (qValue) {
      setText(decodeURIComponent(qValue))
    }
  }, []);

  // Cycle through the placeholder texts every 5 seconds only if no input is provided and no image upload is in progress.
  useEffect(() => {
    if (text !== "" || loading) {
      // const searchText = decodeURIComponent(encodedString);
    }
    const interval = setInterval(() => {
      setPlaceholder((prev) => (prev + 1) % textList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [text, loading, router]);

  return (
    <>
      {/* {loading && (
        <div className="fixed inset-0 z-[40] flex items-center justify-center bg-gray-100">

          <SearchLoader />

        </div>
      )} */}
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

        <button
          onClick={CheckingDataType}
          className={`cursor-pointer bg-primary rounded-md rounded-l-none border-2 text-white  flex items-center border-primary ${
            loading ? "px-2 py-2" : "px-3 py-3"
          } hover:bg-sky-500 hover:border-sky-500 duration-200`}
        >
          {loading ? (
            <div className="w-6 h-6 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-white"></div>
          ) : (
            <span className="flex items-center justify-center gap-1">
              <FaSearch />
              <Sparkles size={16} />
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default Search;
