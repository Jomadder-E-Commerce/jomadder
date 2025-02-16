'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

// const ProductSize = ({ label = true, count, errors, previousProduct }) => {
  const ProductSize = ({ label = true }) => {
// 
let count = 0;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  
  // if your default seleted size show then used

  // useEffect(() => {
  //   if (previousProduct?.size) {
  //     setSelectedValue(previousProduct?.size);
  //   } else {
  //     setSelectedValue([]);
  //   }
  // }, [previousProduct]);
  // array of options
  const options = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // useEffect to handle count change and adjust selectedValue
  // useEffect(() => {
  //   if (selectedValue.length > count) {
  //     // Remove the last selected size when the count decreases
  //     setSelectedValue((prev) => prev.slice(0, count));
  //   }
  // }, [count, selectedValue]);

  const handleSelect = (opt) => {
    if (selectedValue.includes(opt)) {
      setSelectedValue(selectedValue.filter((p) => p !== opt));
    } else {
      if (selectedValue.length < count) {
        setSelectedValue([...selectedValue, opt]);
      } else {
        setSelectedValue([...selectedValue.slice(1), opt]);
      }
    }
  };


  return (
    <>
      <div className="">
        {label &&<Label className="inline-block  mb-3">Select Size</Label>}
        <div className="flex gap-2 cursor-pointer">
          <Input
            type="text"
            className="hidden"
            name="size"
            defaultValue={selectedValue}
          />

          {options?.map((opt, key) => (
            <div
              key={key}
              onClick={() => handleSelect(opt)}
              className={`px-[2px] py-1 lowercase border-gray-300 border text-xs w-7 text-center font-semibold rounded-md ${selectedValue?.includes(opt)
                  ? 'bg-primary text-white'
                  : 'bg-white'
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>

      {/* {errors?.size && (
        <p className="absolute text-sm text-red-500">{errors?.size}</p>
      )} */}
    </>
  );
};

export default ProductSize;
