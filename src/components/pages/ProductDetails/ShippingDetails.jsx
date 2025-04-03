import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import Image from "next/image";
import ProductOrder from "./ProductOrder";
import planeImage from "/src/assets/airplane.png";
import ShippingDetailsTableRow from "../../shared/ShippingDetailsTableRow";
import { CiLocationOn } from "react-icons/ci";
import { FaEye, FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useState } from "react";
// import shipGif from "../../../assets/product-details/ship.gif";
// import shipGif from "../../../assets/product-details/ship-moving.gif";
import shipGif from "../../../assets/product-details/ship-gif.gif";
import { CircleAlert } from "lucide-react";

const ShippingDetails = ({
  quantity = 0,
  price = 0,
  data,
  CompleteTheAddtoCart,
  handleBuyNow,
  className,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Card className={cn("w-full 2xl:min-w-[350px]   mb-10 px-2", className)}>

      <CardHeader className="px-3">
        <CardTitle className="flex items-center justify-between font-medium   md:text-base text-sm">
          <div className="flex items-center gap-[2px]">
            <span className="font-semibold">Door to Door</span>
            <span className="text-[8px] relative -top-1">
              <FaStar className="text-red-600" size={6} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CiLocationOn />
            <span>To Bangladesh</span>
          </div>
        </CardTitle>
        <CardTitle className="bg-gray-100 mt-3 px-2 py-2 rounded-md flex items-center text-sm justify-between">
          <Image
            width={30}
            height={30}
            src="https://flagcdn.com/cn.svg"
            alt="China flag"
            className="object-cover rounded-sm"
          />

          <Image src={shipGif} width={30} height={30} alt="plane" />
          {/* <Image src={planeImage} width={20} height={20} alt="plane" /> */}
          <Image
            width={30}
            height={30}
            src="https://flagcdn.com/bd.svg"
            alt="Bangladesh flag"
            className="object-cover rounded-sm"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Table>
          <TableBody>
            <ShippingDetailsTableRow
              title={`${quantity} Quantity`}
              value={`${price || "0.00"}`}
              className={'hover:bg-gray-200'}
            />
            <ShippingDetailsTableRow
              className={"border-b hover:bg-gray-200"}
              title="Freight + Tax cost"
              value={"0.00"}
            />

            <ShippingDetailsTableRow
              title="Total"
              value={`${price || "0.00"}`}
            />
          </TableBody>
        </Table>
        <h2 className="text-sm px-4 text-red-500 max-w-max mx-auto flex items-center gap-1 relative group">
          Shipping cost will be added later
          <FaEye className="cursor-pointer" />
          <div className="absolute bottom-full right-0 transform -translate-x-1/2 mb-2 p-2 text-xs bg-white text-black rounded shadow-md hidden group-hover:block">
            Shipping cost
          </div>
        </h2>
        {/* Add to cart and buy now and also wishlist */}
        <ProductOrder
          CompleteTheAddtoCart={CompleteTheAddtoCart}
          data={data}
          handleBuyNow={handleBuyNow}
        />
        {/* <div className="space-y-3 pt-4  px-4 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-medium">Jomadder gives</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {['100% money back guarantee', 'Original guarantee', 'Detailed inspection', 'Lower exchange loss', 'Security & Privacy'].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ShippingDetails;
