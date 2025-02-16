import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CiCircleInfo } from "react-icons/ci";

const ShippingDetailsTableRowTooltip =  ({
    title = "Shipping Charge",
    value = 0,
    className,
    tooltip = "Test",
  }) => {
    return (
      <TooltipProvider>
        <TableRow className={cn("", className)}>
          <TableCell className="font-medium w-[50%]">
            {title}{" "}
            <Tooltip>
              <TooltipTrigger>
                <span className="inline-block">
                  <CiCircleInfo className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[250px] text-gray-700">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TableCell>
          <TableCell className="text-right">
            <div>৳ {value}</div>
          </TableCell>
        </TableRow>
      </TooltipProvider>
    );
  };

export default ShippingDetailsTableRowTooltip;