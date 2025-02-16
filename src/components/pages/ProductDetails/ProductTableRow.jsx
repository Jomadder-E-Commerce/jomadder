import { useGetAllPricingQuery } from '@/components/Redux/services/PricingApi';
import { getPercentageForPrice, getPricingData } from '@/components/shared/pricing/Pricing';
import { TableCell, TableRow } from '@/components/ui/table';
import { extractSize, extractTheColor, extractTheSize } from '@/lib/extractSize';
import React from 'react';
import { useEffect, useState } from 'react';

const ProductTableRow = ({ currentSku, item, productSku, addToCart, adding, setAdding }) => {
  const [sku, setSku] = useState({
    image: "",
    size: "",
    color: "",
    quantity: 0,
    price: ""
  })
  useEffect(() => {

    const find = productSku?.find(single => single?.size == item?.props_names && single?.color == currentSku?.name)
    if (find) {
      setSku({ ...find })
    }
    else {
      setSku({
        image: "",
        size: "",
        color: "",
        quantity: 0,
        price: ""
      })
    }
    // console.log(find);
    // console.log(currentSku?.name)
  }, [currentSku?.name, productSku.length, item?.props_names, adding, productSku])
  const [price, setPrice] = useState(0)

  // const translatedSize = useTranslate(item?.props_names);
  const size = extractSize(item?.props_names)

  useEffect(() => {
      const pricingData = Math.ceil(getPercentageForPrice(item?.sale_price))
      setPrice(pricingData)

  }, [item?.sale_price])

  return (
    <TableRow className="border cursor-pointer ">

      {/* {item?.props_names ? <TableCell className="text-center sm:p-4 p-2">{translatedSize}</TableCell> : ""} */}
      {size && <TableCell className="text-center sm:p-4 p-2">{size}</TableCell>}

      <TableCell className="text-center sm:p-4 p-2 text-nowrap">৳ {price}</TableCell>
      <TableCell className="flex justify-center sm:p-4 p-2">
        <div onClick={() => { addToCart({ image: currentSku?.image, color: currentSku?.name, size: item?.props_names, price: String(price), quantity: -1, sku: item?.props_names }); setAdding(!adding) }} className="px-4 py-2 border cursor-pointer">-</div>
        <input
          type="text"
          value={sku?.quantity}
          className="sm:px-2 px-1 py-2 border text-center focus:outline-none sm:w-[100px] w-[40px]"
        />
        <div onClick={() => { addToCart({ image: currentSku?.image, color: currentSku?.name, size: item?.props_names, price: String(price), quantity: 1, sku: item?.props_names }); setAdding(!adding) }} className="px-4 py-2 border cursor-pointer">+</div>
      </TableCell>
      {/* <TableCell><Button onClick={()=>{addToCart({image:currentSku?.image, color:currentSku?.name , size:item?.props_names,price:item?.sale_price , quantity: 1 })}}>Add</Button></TableCell> */}
    </TableRow>
  );
};

export default ProductTableRow;