"use client";
import { useState, useEffect } from "react";
import ShippingTabs from "./ShippingTabs";
import {
  useGetPricingQuery,
  useGetShipmentProductListQuery,
} from "@/components/Redux/services/shipmentApi";
import { generateTabData } from "@/data/ShippingTabData";
import { toast } from "react-toastify";

export default function CostCalculator() {
  const [activeTab, setActiveTab] = useState("Air");
  const [formData, setFormData] = useState({
    Air: {},
    Sea: {},
    Road: {},
    HandCarry: {},
  });
  const [cost, setCost] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const [pricePerKg,setPricePerKg] = useState(0);
  const { data: productListData } = useGetShipmentProductListQuery();
  const productsData = productListData?.data?.map((item) => item.product) || [];
  console.log('lala',productsData)

  const { data: pricingData, isFetching } = useGetPricingQuery(
    selectedProduct,
    {
      skip: !selectedProduct,
    }
  );

  const tabData = generateTabData(productsData);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,  
      [activeTab]: {
        productType: "", 
        weight: "",     
      },
    }));
    setSelectedProduct(null); 
    setCost(0);       
  }, [activeTab]); 
  
  const handleInputChange = (name, value) => {
    if (name === "weight") {
      value = Math.max(0, value); 
    }

    setFormData((prevData) => ({
      ...prevData,
      [activeTab]: {
        ...prevData[activeTab],
        [name]: value, 
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeTabData = formData[activeTab];
    const productType = activeTabData.productType;
    const weight = parseFloat(activeTabData.weight || 0);

    if (!productType || !weight) {
      toast.error("Please select a product and enter a valid weight.");
      return;
    }
    setSelectedProduct(productType);
  };

  useEffect(() => {
    if (pricingData?.success && selectedProduct) {
      const activeTabData = formData[activeTab];
      const weight = parseFloat(activeTabData.weight || 0);
  
      if (weight > 0) {
        let pricePerKg = 0;
        switch (activeTab.toLowerCase()) {
          case "air":
            pricePerKg = pricingData.data.airPricing?.[0]?.pricePerKg || 0;
            break;
          case "sea":
            pricePerKg = pricingData.data.seaPricing?.[0]?.pricePerKg || 0;
            break;
          case "road":
            pricePerKg = pricingData.data.roadPricing?.[0]?.pricePerKg || 0;
            break;
          case "handcarry":
            pricePerKg = pricingData.data.handCarryPricing?.[0]?.pricePerKg || 0;
            break;
          default:
            break;
        }
  
        if (pricePerKg > 0) {
          const calculatedCost = pricePerKg * weight;
          setPricePerKg(pricePerKg)
          setCost(calculatedCost); 
        }
      } else {
        setCost(0); 
      }
    } else {
      setCost(0); 
    }
  }, [pricingData, selectedProduct, formData, activeTab]);

  return (
    <div className="md:container md:mx-auto mx-2 md:my-20 my-8">
      <div className="md:max-w-4xl mx-auto md:border md:p-7 p-1 rounded-xl">
        <ShippingTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabData={tabData}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          cost={cost}
          loading={isFetching}
          pricePerKg={pricePerKg}
        />
      </div>
    </div>
  );
}
