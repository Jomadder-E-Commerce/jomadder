"use client";

import Image from "next/image";
import ProductColorItem from "./ProductColorItem";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

const ProductColor = ({
  data,
  selected,
  skuDataImage = [],
  handleChooseProductJustText,
  handleChooseSelectedProduct,
  productSku,
  setProductSku,
  adding,
  setAdding,
}) => {
  const [copy, setCopy] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this product!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  // Function to copy the current page URL to the clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopy(true)
    } catch (error) {
      setCopy(false)
    }
  };
  return (
    <div className="flex flex-col ">
      {data ? (
        <div>

          <h1 className="2xl:text-lg md:text-sm text-sm">
            Color : {" "}
            {/* <TranslateText text={translatedData}>
            {(translated) => <>  {translated}</>}
          </TranslateText>
          :
          <TranslateText text={translatedName}>
            {(translated) => <>  {translated}</>}
          </TranslateText>{" "} */}
            {selected?.name}
          </h1>
        </div>

      ) : (
        ""
      )}
      {/* images of the products */}

      <div className=" flex flex-wrap my-3 gap-3 mt-6">
        {skuDataImage?.map((item, key) => (
          <ProductColorItem
            adding={adding}
            setAdding={setAdding}
            productSku={productSku}
            setProductSku={setProductSku}
            selected={selected}
            item={item}
            handleChooseProductJustText={handleChooseProductJustText}
            handleChooseSelectedProduct={handleChooseSelectedProduct}
            key={key}
          />
        ))}
        {/* <ProductColorItem adding={adding} setAdding={setAdding} productSku={productSku} setProductSku={setProductSku} selected={selected} item={item} handleChooseProductJustText={handleChooseProductJustText} handleChooseSelectedProduct={handleChooseSelectedProduct} key={key}/> */}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaShareAlt />
          Share
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <FaCopy />
          {
            !copy ? "Copy Link" : "Copied"
          }
        </button>
      </div>
    </div>
  );
};

export default ProductColor;
