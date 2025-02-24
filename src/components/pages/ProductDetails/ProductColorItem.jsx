"use client"
import Image from "next/image";
import React from "react";
import {useState,useEffect} from "react"

const ProductColorItem = ({ item,handleChooseProductJustText,selected, handleChooseSelectedProduct,productSku, setProductSku,adding,setAdding }) => {
    const [quantity,setQuantity] = useState(0);
     const [finddata,setFind] = useState([])

   useEffect(()=>{
    const find = productSku?.filter((single)=> single?.color == item?.name  )
   setFind([...find])
   let newQuantity = 0
    if(find?.length){
        for (let int = 0; int < find.length; int++) {
          newQuantity = newQuantity + find[int]?.quantity   
          console.log(find[int]?.quantity)
        }
        
        setQuantity(newQuantity)
    }
    else{
        setQuantity(newQuantity);
    }
   
   },[item?.name, productSku?.length,adding])
//   console.log(productSku)

    return (
      <div className="relative inline-block">
      {quantity !== undefined && quantity > 0 && (
        <span className="absolute z-[30] bg-gray-700 px-2 py-1 min-w-[30px] text-center text-white text-xs rounded-full -top-2 -right-2">
          {quantity}
        </span>
      )}
      
      {item?.imageUrl ? (
        <Image 
          unoptimized  
          onClick={() => handleChooseSelectedProduct(item?.imageUrl, item?.name)}
          src={item?.imageUrl}
          width={90}
          height={90}
          alt="image"
          className={`cursor-pointer sm:w-[65px] sm:h-[65px] w-[45px] h-[45px] ${
            selected?.name === item?.name 
              ? "border-2 border-primary" 
              : "border-2 hover:border-primary"
          } rounded-lg`}
        />
      ) : (
        <button
          onClick={() => handleChooseProductJustText(item?.name)}
          className={`relative w-max ${
            selected?.name === item?.name
              ? "border-2 border-gray-600"
              : "border-2 hover:border-gray-600"
          } cursor-pointer p-2 rounded-lg max-w-[100px] text-sm font-semibold text-gray-600`}
        >
          {item?.name}
        </button>
      )}
    </div>
  );
};

export default ProductColorItem;
