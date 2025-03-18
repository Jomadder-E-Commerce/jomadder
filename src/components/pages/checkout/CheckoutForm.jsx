import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFormData, setFormValid } from "@/components/Redux/features/AllSlice/checkoutSlice";
import { useGetUserQuery } from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";
import { DynamicSelect } from "@/components/ui/DynamicSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CheckoutSkeleton from "./CheckoutSkeleton";
import useGetDistrict from "@/hooks/useGetDistrict";

const CheckoutForm = () => {
  const { data, isLoading, error } = useGetUserQuery();
  const dispatch = useDispatch();
  const userData = data?.data?.user;

  const [formData, setFormDataFull] = useState({
    orderName: "",
    orderEmail: "",
    OrderPhone: "",
    division: "",
    district: "",
    city: "",
    shippingAddress: "",
    orderNote: "",
    postCode: "",
  });

  const [errors, setErrors] = useState({});
  const { allDivisions, getDistrictsByDivision, needDistricts } = useGetDistrict();

  // Fixed initialization with stable dependencies
  useEffect(() => {
    if (userData) {
      const address = userData?.address || {};
      const userDivision = allDivisions.find(d => d.name == address.division);
      
      // Only update if division exists in current divisions
      if (userDivision) {
        getDistrictsByDivision(userDivision.id);
      }

      // Prevent unnecessary state updates
      setFormDataFull(prev => ({
        ...prev,
        orderName: userData.name || "",
        orderEmail: userData.email || "",
        OrderPhone: userData.phone || "",
        division: address.division || "",
        district: address.district || "",
        city: address.city || "",
        shippingAddress: address.address || "",
        postCode: address.postCode || "",
      }));
    }
  }, [userData]); // Removed getDistrictsByDivision from dependencies

  const handleSelectChange = useCallback((name, value) => {
    setFormDataFull(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === "division") {
        newData.district = "";
        newData.city = "";
        const selectedDivision = allDivisions.find(d => d.name === value);
        if (selectedDivision) {
          getDistrictsByDivision(selectedDivision.id);
        }
      }
      if (name === "district") {
        newData.city = "";
      }
      
      return newData;
    });
    setErrors(prev => ({ ...prev, [name]: "" }));
  }, [allDivisions, userData]);

  // Handle select changes with proper data fetching


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataFull(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    const requiredFields = [
      'orderName', 'orderEmail', 'OrderPhone', 
      'division', 'district', 'city', 'shippingAddress'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `Please ${field.startsWith('order') ? 'provide' : 'select'} ${field.replace(/[A-Z]/g, m => " " + m.toLowerCase())}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Update global state
  useEffect(() => {
    const isValid = validateForm();
    dispatch(setFormValid(isValid));
    console.log('I am coming here.')

    dispatch(setFormData(formData));
  }, [formData]);

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
            <Label>Email *</Label>
            <Input
              type="email"
              name="orderEmail"
              value={formData.orderEmail}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {errors.orderEmail && <FormError message={errors.orderEmail} />}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Phone *</Label>
            <Input
              name="OrderPhone"
              value={formData.OrderPhone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {errors.OrderPhone && <FormError message={errors.OrderPhone} />}
          </div>
          <div>
            <Label>Country *</Label>
            <DynamicSelect
              options={["Bangladesh"]}
              value="Bangladesh"
              placeholder="Select Country"
              disabled
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Division *</Label>
            <DynamicSelect
              options={allDivisions?.map(d => d.name)}
              value={formData.division}
              onValueChange={value => handleSelectChange("division", value)}
              placeholder="Select Division"
            />
            {errors.division && <FormError message={errors.division} />}
          </div>
          <div>
            <Label>District *</Label>
            <DynamicSelect
              options={needDistricts?.map(d => d.name)}
              value={formData.district}
              onValueChange={value => handleSelectChange("district", value)}
              placeholder="Select District"
              disabled={!formData.division}
            />
            {errors.district && <FormError message={errors.district} />}
          </div>
        </div>

        {/* Address Details */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>City/Thana *</Label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Your city or thana"
            />
            {errors.city && <FormError message={errors.city} />}
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
          {errors.shippingAddress && <FormError message={errors.shippingAddress} />}
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