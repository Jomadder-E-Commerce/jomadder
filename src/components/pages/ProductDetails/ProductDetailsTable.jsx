import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableHead as TableCell, // Adjust this import as needed if you have a dedicated TableCell component
} from "@/components/ui/table";
import ProductTableRow from "./ProductTableRow";
import { extractKey } from "@/lib/extractSize";

export default function ProductDetailsTable({
  productSku,
  pricingSku = [],
  addToCart,
  currentSku,
  adding,
  setAdding,
}) {
  const size = extractKey(pricingSku[0]?.props_names);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start index based on the current page
  const startIndex = currentPage * itemsPerPage;
  const visibleItems = pricingSku.slice(startIndex, startIndex + itemsPerPage);

  // Determine if there are more rows ahead (and optionally behind)
  const hasNextPage = startIndex + itemsPerPage < pricingSku.length;
  const hasPreviousPage = currentPage > 0;

  return (
    <div className="overflow-y-auto sm:max-h-[340px] max-h-[270px] 2xl:max-w-[500px] md:max-w-[400px] mt-4 border border-gray-200">
      <Table className="  w-full rounded-lg  ">
        <TableHeader className="border w-full sticky top-0 bg-white z-10">
          <TableRow className="bg-white rounded-t-xl sticky top-0">
            {size && (
              <TableCell className="font-semibold text-black text-center text-sm sticky top-0 bg-white z-10">
                {size}
              </TableCell>
            )}
            <TableCell className="font-semibold text-black text-center sticky top-0 bg-white z-10">
              Price
            </TableCell>
            <TableCell className="font-semibold text-black text-center sticky top-0 bg-white z-10">
              Stock
            </TableCell>
            <TableCell className="font-semibold text-black text-center sticky top-0 bg-white z-10">
              Quantity
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {pricingSku.map((item, index) => (
            <ProductTableRow
              key={index}
              adding={adding}
              setAdding={setAdding}
              addToCart={addToCart}
              productSku={productSku}
              currentSku={currentSku}
              item={item}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
