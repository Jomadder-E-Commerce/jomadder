import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";
import { CiCircleInfo } from "react-icons/ci";
const ShippingDetailsTableRow = ({
  title = "Shipping Charge",
  value = 0,
  className,
}) => {
  return (
    <TableRow className={cn("", className)}>
      {
        title == "Total" ?  <>
        <TableCell className="font-bold w-[60%] py-3">{title}</TableCell>
        <TableCell className="text-right font-bold py-3">
          <div>৳ {value} </div>
        </TableCell>
        </>  : <>
        <TableCell className="font-medium w-[60%] py-3">{title}</TableCell>
        <TableCell className="text-right py-3">
          <div>৳ {value} </div>
        </TableCell></>
      }
    
    </TableRow>
  );
};

export default ShippingDetailsTableRow;



