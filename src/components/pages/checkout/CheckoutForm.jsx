import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setFormData,
  setFormValid,
} from "@/components/Redux/features/AllSlice/checkoutSlice";
import { useGetUserQuery } from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";
import { DynamicSelect } from "@/components/ui/DynamicSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CheckoutSkeleton from "./CheckoutSkeleton";
import useGetDistrict from "@/hooks/useGetDistrict";
import SearchSelect from "@/components/ui/SearchSelect";

const CheckoutForm = () => {
  const { data, isLoading, error } = useGetUserQuery();
  const dispatch = useDispatch();
  const userData = data?.data?.user;

  const [formData, setFormDataFull] = useState({
    orderName: "",
    orderEmail: "",
    OrderPhone: "",
    // division: "",
    district: "",
    area: "",
    shippingAddress: "",
    orderNote: "",
    postCode: "",
  });

  const [errors, setErrors] = useState({});
  const {
    // allDivisions,
    getDistricts,
    getAreaByDistricts,
    // getUnionsByUpazilla,
    needDistricts,
    needArea,
    needUnions,
  } = useGetDistrict();

  // Fixed initialization with stable dependencies
  useEffect(() => {
    if (userData) {
      const address = userData?.address || {};
      // const userDivision = allDivisions.find((d) => d.name == address.division);

      // Only update if division exists in current divisions
      if (userData) {
        getDistricts();
        const selectedDistrict = needDistricts.find(
          (d) => d.name === address.district
        );
        if (selectedDistrict) {
          getAreaByDistricts(selectedDistrict.id);
        }
      }
      // Prevent unnecessary state updates
      setFormDataFull((prev) => ({
        ...prev,
        orderName: userData.name || "",
        orderEmail: userData.email || "",
        OrderPhone: userData.phone || "",
        division: address?.division || "",
        district: address.district || "",
        area: address.area || "",
        city: address.city || "",
        shippingAddress: address.address || "",
        postCode: address.postCode || "",
      }));
    }
  }, [userData]); // Removed getDistrictsByDivision from dependencies

  useEffect(() => {
    if (userData) {
      const selectedDistrict = needDistricts.find(
        (d) => d.name === userData?.address.district
      );
      if (selectedDistrict) {
        getAreaByDistricts(selectedDistrict.id);
      }
    }
  }, [needDistricts]);
  const handleSelectChange = useCallback(
    (name, value) => {
      name &&
        value &&
        setFormDataFull((prev) => {
          const newData = { ...prev, [name]: value };

          // if (name === "division") {
          //   newData.district = "";
          //   const selectedDivision = allDivisions.find((d) => d.name === value);
          //   if (selectedDivision) {
          //     getDistrictsByDivision(selectedDivision.id);
          //   }
          // }
          if (name === "district") {
            newData.area = ""
            const selectedDistrict = needDistricts.find(
              (d) => d.name === value
            );
            if (selectedDistrict) {
              getAreaByDistricts(selectedDistrict.id);
            }
          }

          // if (name === "area") {
          //   const selectedUpazilla = needArea.find((d) => d.name === value);
          //   if (selectedUpazilla) {
          //     getUnionsByUpazilla(selectedUpazilla.id);
          //   }
          // }

          return newData;
        });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [userData, needDistricts, needArea]
  );

  // Handle select changes with proper data fetching

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataFull((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    const requiredFields = [
      "orderName",
      "OrderPhone",
      "district",
      "area",
      "shippingAddress",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `Please ${
          field.startsWith("order") ? "provide" : "select"
        } ${field.replace(/[A-Z]/g, (m) => " " + m.toLowerCase())}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Update global state
  useEffect(() => {
    const isValid = validateForm();
    dispatch(setFormValid(isValid));
    // console.log("I am coming here.");

    dispatch(setFormData(formData));
  }, [formData]);

  function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    phoneNumber = phoneNumber.replace(/\D/g, "");

    // Check if the number already has the international prefix, if not add it
    if (phoneNumber.startsWith("880")) {
      return `+${phoneNumber}`;
    } else if (phoneNumber.startsWith("0")) {
      return `+88${phoneNumber.substring(1)}`;
    } else {
      return `+880${phoneNumber}`;
    }
  }

  if (isLoading) return <CheckoutSkeleton />;
  if (error) return <div>Error loading user data</div>;

  return (
    <div className="w-full">
      <form className="p-6 bg-white border rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">CHECKOUT</h2>

        {/* Personal Information */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Name *</Label>
            <Input
              name="orderName"
              value={formData.orderName}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
            {errors.orderName && <FormError message={errors.orderName} />}
          </div>
          <div>
            <Label>Phone *</Label>
            <Input
              name="OrderPhone"
              value={formatPhoneNumber(formData.OrderPhone)}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {errors.OrderPhone && <FormError message={errors.OrderPhone} />}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Country *</Label>
            <DynamicSelect
              options={["Bangladesh"]}
              value="Bangladesh"
              placeholder="Select Country"
              disabled
            />
          </div>
          <div>
            <Label>District *</Label>
            <SearchSelect
              options={needDistricts}
              value={{
                label: formData.district,
                value: formData.district,
              }}
              onValueChange={(value) =>
                handleSelectChange("district", value?.value)
              }
              placeholder="Select District"
              // disabled={!formData.division}
            />
            {errors.district && <FormError message={errors.district} />}
          </div>
          {/* <div>
            <Label>Division *</Label>
            <DynamicSelect
              options={allDivisions?.map((d) => d.name)}
              value={formData.division}
              onValueChange={(value) => handleSelectChange("division", value)}
              placeholder="Select Division"
            />
            {errors.division && <FormError message={errors.division} />}
          </div> */}
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Area *</Label>
            <SearchSelect
              options={needArea}
              value={{ label: formData.area, value: formData.area }}
              onValueChange={(e) => handleSelectChange("area", e?.value)}
              placeholder="Select Area"
              key={formData.area}
            />
            {errors.area && <FormError message={errors.area} />}
          </div>
          <div>
            <Label>Post Code (Optional)</Label>
            <Input
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              placeholder="Enter Post Code"
            />
          </div>
        </div>

        {/* Address Details */}
        {/* <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Unions *</Label>
            <DynamicSelect
              options={needUnions?.map((d) => d.name)}
              value={formData.unions}
              onValueChange={(value) => handleSelectChange("unions", value)}
              placeholder="Select Unions"
              disabled={!formData.upazilla}
            />
            {errors.unions && <FormError message={errors.unions} />}
          </div>
          <div>
            <Label>Post Code (Optional)</Label>
            <Input
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              placeholder="Enter Post Code"
            />
          </div>
        </div> */}

        <div className="mb-4">
          <Label>
            Email <span className=" opacity-50">(Optional)</span>
          </Label>
          <Input
            type="email"
            name="orderEmail"
            value={formData.orderEmail}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.orderEmail && <FormError message={errors.orderEmail} />}
        </div>

        {/* Shipping Address */}
        <div className="mb-4">
          <Label>Shipping Address *</Label>
          <Textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            placeholder="Enter your address"
            rows="3"
          />
          {errors.shippingAddress && (
            <FormError message={errors.shippingAddress} />
          )}
        </div>

        {/* Order Notes */}
        <div className="mb-4">
          <Label>Order Note</Label>
          <Textarea
            name="orderNote"
            value={formData.orderNote}
            onChange={handleInputChange}
            placeholder="Leave a note (optional)"
            rows="2"
          />
        </div>
      </form>
    </div>
  );
};

// Helper component for error messages
const FormError = ({ message }) => (
  <p className="mt-1 text-sm text-red-500">{message}</p>
);

export default CheckoutForm;
