import { Plane, Ship, Truck, HandMetal } from "lucide-react";

const commonFields = (productsData) => [
  {
    name: "country",
    label: "From",
    type: "text",
    readonly: true,
    defaultValue: "China",
  },
  {
    name: "destination",
    label: "To",
    type: "text",
    readonly: true,
    defaultValue: "Bangladesh",
  },
  { name: "weight", label: "Weight (kg)", type: "number" },
  {
    name: "productType",
    label: "Product Type",
    type: "select",
    options: productsData,
  },
];

export const generateTabData = (productsData) => ({
  Air: {
    title: "Fast air freight",
    description: "Expedited shipping for time-sensitive cargo",
    icon: <Plane className="h-5 w-5 mb-1" />,
    fields: [...commonFields(productsData)],
  },
  Sea: {
    title: "Container shipping",
    description: "Cost-effective for large volume shipments",
    icon: <Ship className="h-5 w-5 mb-1" />,
    fields: [...commonFields(productsData)],
  },
  Road: {
    title: "Truck delivery",
    description: "Flexible and reliable ground transportation",
    icon: <Truck className="h-5 w-5 mb-1" />,
    fields: [...commonFields(productsData)],
  },
  HandCarry: {
    title: "Personal courier",
    description: "Secure and immediate delivery for valuable items",
    icon: <HandMetal className="h-5 w-5 mb-1" />,
    fields: [...commonFields(productsData)],
  },
});
