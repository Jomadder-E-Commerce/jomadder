import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFormData, setFormValid } from "@/components/Redux/features/AllSlice/checkoutSlice";
import { useGetUserQuery } from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";
import { DynamicSelect } from "@/components/ui/DynamicSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useLocationData from "@/hooks/useDivisions";

const CheckoutForm = () => {
  const { data, isLoading, error } = useGetUserQuery();
  const dispatch = useDispatch();
  const userData = data?.data?.user;

  // State initialization
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

  // Location data fetching
  const { data: divisions } = useLocationData("divisions");
  const { data: districts } = useLocationData("division", formData.division);
  const { data: cities } = useLocationData("district", formData.district);


  // Pre-fill form with user data on load
  useEffect(() => {
    if (userData?.address) {
      setFormDataFull({
        orderName: userData.name || "",
        orderEmail: userData.email || "",
        OrderPhone: userData.phone || "",
        division: userData.address.division || "",
        district: userData.address.district || "",
        city: userData.address.city || "",
        shippingAddress: userData.address.address || "",
        postCode: userData.address.postCode || "",
        orderNote: "",
      });
    }
  }, [userData]);

  // Update dependent options when userData loads
  // useEffect(() => {
  //   if (userData && userData.address) {
  //     const division = userData.address.division;
  //     const district = userData.address.district;
  //     const selectedDivision = bangladeshData.find((div) => div.division === division);
  //     if (selectedDivision) {
  //       setDistricts(selectedDivision.districts || []);
  //       const selectedDistrict = selectedDivision.districts.find(
  //         (dist) => dist.district === district
  //       );
  //       if (selectedDistrict) {
  //         setCities(selectedDistrict.policeStations || []);
  //       }
  //     }
  //   }
  // }, [userData]);

const handleSelectChange = useCallback((name, value) => {
    setFormDataFull(prev => {
      const newData = { ...prev, [name]: value };
      
      // Reset dependent fields
      if (name === "division") {
        newData.district = "";
        newData.city = "";
      }
      if (name === "district") {
        newData.city = "";
      }
      
      return newData;
    });
    
    setErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataFull(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Validate form fields (all required except postCode and orderNote)
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.orderName.trim()) {
      newErrors.orderName = "Please give name";
    }
    if (!formData.orderEmail.trim()) {
      newErrors.orderEmail = "Please provide an email";
    }
    if (!formData.OrderPhone.trim()) {
      newErrors.OrderPhone = "Please provide a phone number";
    }
    if (!formData.division.trim()) {
      newErrors.division = "Please select a division";
    }
    if (!formData.district.trim()) {
      newErrors.district = "Please select a district";
    }
    if (!formData.city.trim()) {
      newErrors.city = "Please provide your city or thana";
    }
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Please provide your shipping address";
    }
    // postCode is optional, so no error if it is empty

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Validate form and dispatch actions on form data change
  useEffect(() => {
    const isFormValid = validateForm();
    dispatch(setFormValid(isFormValid));
    dispatch(setFormData(formData));
  }, [formData, validateForm, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;
  return (
    <div className="w-full">
      <form className="p-6 bg-white border rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">CHECKOUT</h2>

        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Name *</Label>
            <Input
              type="text"
              name="orderName"
              value={formData.orderName}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
            {errors.orderName && (
              <p className="text-red-500 text-sm">{errors.orderName}</p>
            )}
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
            {errors.orderEmail && (
              <p className="text-red-500 text-sm">{errors.orderEmail}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Phone *</Label>
            <Input
              type="text"
              name="OrderPhone"
              value={formData.OrderPhone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {errors.OrderPhone && (
              <p className="text-red-500 text-sm">{errors.OrderPhone}</p>
            )}
          </div>
          <div>
            <Label>Country *</Label>
            <DynamicSelect
              options={["Bangladesh"]}
              value={"Bangladesh"}
              placeholder="Select Country"
            />
          </div>
        </div>

        {/* Division, District, City */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>Division *</Label>
            <DynamicSelect
              options={divisions?.map(div => div.division)}
              value={formData.division}
              onValueChange={value => handleSelectChange("division", value)}
              placeholder="Select Division"
            />
            {errors.division && <p className="text-red-500 text-sm">{errors.division}</p>}
          </div>

          <div>
            <Label>District *</Label>
            <DynamicSelect
              options={districts?.map(dist => dist.district)}
              value={formData.district}
              onValueChange={value => handleSelectChange("district", value)}
              placeholder="Select District"
              disabled={!formData.division}
            />
            {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <Label>City / Thana *</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Your city or thana"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <Label>Post Code (Optional)</Label>
            <Input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              placeholder="Enter Post Code"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm">{errors.postCode}</p>
            )}
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
          />
          {errors.shippingAddress && (
            <p className="text-red-500 text-sm">{errors.shippingAddress}</p>
          )}
        </div>

        {/* Order Note */}
        <div className="mb-4">
          <Label>Order Note</Label>
          <Textarea
            name="orderNote"
            value={formData.orderNote}
            onChange={handleInputChange}
            placeholder="Leave a note (optional)"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
