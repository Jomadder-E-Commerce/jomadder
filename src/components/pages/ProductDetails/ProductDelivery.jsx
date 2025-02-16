import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckReturn } from "react-icons/tb";

const ProductDelivery = () => {
  return (
    <div>
      <div className="flex justify-start w-3/4 items-start gap-5 border p-4">
        <CiDeliveryTruck className="text-2xl"/>
        <div>
          <h4 className="font-semibold">Free Delivery</h4>
          <p className="text-sm">Enter your postal code for Delivery Availability</p>
        </div>
      </div>
      <div className="flex justify-start w-3/4 items-start gap-5 border p-4">
        <TbTruckReturn className="text-2xl"/>
        <div>
          <h4 className="font-semibold">Return Delivery</h4>
          <p className="text-sm">Free 30 days Delivery Return Details</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDelivery;
