import { useGetAllPricingQuery } from '@/components/Redux/services/PricingApi';
import { getPercentageForPrice, getPricingData } from '@/components/shared/pricing/Pricing';
import { TableCell, TableRow } from '@/components/ui/table';
import { extractSize } from '@/lib/extractSize';
import React, { useEffect, useState } from 'react';

const ProductTableRow = ({ currentSku, item, productSku, addToCart, adding, setAdding }) => {
  const [sku, setSku] = useState({
    image: "",
    size: "",
    color: "",
    quantity: 0,
    price: ""
  });
  const [showQuantity, setShowQuantity] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const find = productSku?.find(single => single?.size === item?.props_names && single?.color === currentSku?.name);
    if (find) {
      setSku({ ...find });
      setInputValue(find.quantity.toString());
      setShowQuantity(find.quantity > 0);
    } else {
      setSku({
        image: "",
        size: "",
        color: "",
        quantity: 0,
        price: ""
      });
      setInputValue("0");
      setShowQuantity(false);
    }
  }, [currentSku?.name, productSku, item?.props_names, adding]);

  const [price, setPrice] = useState(0);
  const size = extractSize(item?.props_names);

  useEffect(() => {
    const pricingData = Math.ceil(getPercentageForPrice(item?.sale_price));
    setPrice(pricingData);
  }, [item?.sale_price]);

  const handleAddClick = () => {
    addToCart({
      image: currentSku?.image,
      color: currentSku?.name,
      size: item?.props_names,
      price: String(price),
      quantity: 1,
      sku: item?.props_names,
      situation : 1
    });
    setAdding(!adding);
  };

  const updateQuantity = (newQuantity) => {
    newQuantity = Math.max(0, parseInt(newQuantity, 10) || 0);
     let situation = 1;

    if (newQuantity !== sku.quantity) {
      
      let delta = newQuantity - sku.quantity;


      if(delta < 0){
        situation = -1;
        delta = Math.abs(delta);
      }
      addToCart({
        image: currentSku?.image,
        color: currentSku?.name,
        size: item?.props_names,
        price: String(price),
        quantity: delta,
        sku: item?.props_names,
        situation
      });
      setAdding(!adding);
    }
    
    setShowQuantity(newQuantity > 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    setInputValue(value);
    
    if (value === "") {
      updateQuantity(0);
      return;
    }
   
    const numericValue = parseInt(value, 10);
   
    if (!isNaN(numericValue)) {
      
      updateQuantity(numericValue);
    }
  };

  const handleButtonChange = (delta) => {
    const newValue = Math.max(0, sku.quantity + delta);
    setInputValue(newValue.toString());
    updateQuantity(newValue);
  };

  return (
    <TableRow className="border cursor-pointer">
      {size && <TableCell className="text-center sm:p-4 p-2">{size}</TableCell>}
      <TableCell className="text-center sm:p-4 p-2 text-nowrap">৳ {price}</TableCell>
      <TableCell className="flex justify-center sm:p-4 p-2 w-[130px] mx-auto">
          <div className="flex items-center">
            <button 
              onClick={() => handleButtonChange(-1)}
              className="px-3 py-1 border cursor-pointer hover:bg-gray-100 text-xl"
            >
              -
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="sm:px-2 px-1 py-2 border text-center focus:outline-none w-[50px]"
            />
            <button 
              onClick={() => handleButtonChange(1)}
              className="px-3 py-1 border cursor-pointer hover:bg-gray-100 text-xl"
            >
              +
            </button>
          </div>
        {/* ) : (
          <button
            onClick={handleAddClick}
            className="px-8 rounded-lg py-[9px] bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        )} */}
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;