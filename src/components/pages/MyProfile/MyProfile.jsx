"use client";
import React, { useState, useEffect } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";
import { convertValuesToLowerCase } from "@/utils/convert";
import { toast } from "react-toastify";
import { ImageHosting } from "@/components/shared/Cloudinary";
import Address from "./Address";
import ShopInfo from "./ShopInfo";
import AccountInformation from "@/components/pages/MyProfile/AccountInformation";
import { bangladeshData } from "@/lib/CountryData";
import ShopAddress from "./ShopAddress";
import SidebarText from "@/components/shared/Siderbar/SidebarText";
const MyProfile= ({ type })=> {
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading, isError: getUserError, refetch } = useGetUserQuery();
  const userData = data?.data?.user;

  // Create a local state to hold the user data for optimistic updates.
  const [optimisticUserData, setOptimisticUserData] = useState(userData);

  const [bannerEditMode, setBannerEditMode] = useState(false);
  const [addressEditMode, setAddressEditMode] = useState(false);
  const [shopInfoEditMode, setShopInfoEditMode] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    gender: "male",
    dateofbirth: "",
    division: "",
    district: "",
    city: "",
    address: "",
    postCode: "",
    shopDivision: "",
    shopDistrict: "",
    shopCity: "",
    shopCode: "",
    shopAddress: "",
    photo: "",
  });

  // Whenever userData is received from the query, update both formData and our optimistic state.
  useEffect(() => {
    if (userData) {
      setOptimisticUserData(userData);
      setFormData({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        role: userData?.role || "",
        gender: userData?.gender || "",
        dateofbirth: userData?.dateofbirth || "",
        photo: userData?.photo || "",

        // Address fields
        division: userData?.address?.division || "",
        district: userData?.address?.district || "",
        city: userData?.address?.city || "",
        postCode: userData?.address?.postCode || "",
        address: userData?.address?.address || "",

        // Shop fields
        shopDivision: userData?.shop?.division || "",
        shopDistrict: userData?.shop?.district || "",
        shopCity: userData?.shop?.city || "",
        shopCode: userData?.shop?.postCode || "",
        shopAddress: userData?.shop?.address || "",
      });
    }
  }, [userData]);

  const handleDivisionChange = (selectedDivision) => {
    setFormData((prevState) => ({
      ...prevState,
      division: selectedDivision,
      district: "",
      city: "",
    }));
  };

  const handleShopDivisionChange = (selectedDivision) => {
    setFormData((prevState) => ({
      ...prevState,
      shopDivision: selectedDivision,
      shopDistrict: "",
      shopCity: "",
    }));
  };

  const handleDistrictChange = (selectedDistrict) => {
    setFormData((prevState) => ({
      ...prevState,
      district: selectedDistrict,
      city: "",
      postCode: "",
      address: "",
    }));
  };

  const handleShopDistrictChange = (selectedShopDistrict) => {
    setFormData((prevState) => ({
      ...prevState,
      shopDistrict: selectedShopDistrict,
      shopCity: "",
    }));
  };

  const handleThanaChange = (selectedThana) => {
    setFormData((prevState) => ({
      ...prevState,
      city: selectedThana,
    }));
  };

  const handleShopThanaChange = (selectedShopThana) => {
    setFormData((prevState) => ({
      ...prevState,
      shopCity: selectedShopThana,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (image, callback) => {
    setNewImage(image);
    if (callback) callback(image);
  };

  const UploadImage = async(image)=>{
    try{
    const res = await updateUser({photo : image}).unwrap()
      toast.success("Image uploaded successfully");
      refetch()  
    }
    catch(err){
      toast.error("Cannot update Image")
    }
    
   
  }
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
  
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    let photoUrl = formData.photo;
    setAddressEditMode(false);
        setBannerEditMode(false);
        setShopInfoEditMode(false);
    if (newImage) {
      try {
        const uploadImageResponse = await ImageHosting(newImage);
        photoUrl = uploadImageResponse.url;
      } catch (error) {
        console.log(error)
        toast.error("Failed to upload image. Please try again.");
        return;
      }
    }
  
    // Prepare address and shop data objects
    const addressData = {
      address: formData.address,
      city: formData.city,
      district: formData.district,
      postCode: formData.postCode,
      division: formData.division,
    };
  
    const shopData = {
      address: formData.shopAddress,
      city: formData.shopCity,
      district: formData.shopDistrict,
      postCode: formData.shopCode,
      division: formData.shopDivision,
    };
  
    // Build the payload—only sending values that are not empty.
    const filteredPayload = Object.fromEntries(
      Object.entries({
        ...convertValuesToLowerCase(formData),
        address: addressData,
        shop: shopData,
        photo: photoUrl,
      }).filter(([key, value]) => value !== "")
    );
  
    // Store a copy of the current optimistic data in case we need to roll back.
    const previousUserData = optimisticUserData;
  
    // Merge the new changes into our optimistic data so that the UI updates immediately.
    const updatedUserData = {
      ...optimisticUserData,
      ...filteredPayload,
      address: {
        ...optimisticUserData?.address,
        ...filteredPayload.address,
      },
      shop: {
        ...optimisticUserData?.shop,
        ...filteredPayload.shop,
      },
    };
  
    // Update the local state immediately.
    setOptimisticUserData(updatedUserData);
  
    try {
      const res = await updateUser(filteredPayload).unwrap();
      if (res?.data) {
        toast.success("Profile updated successfully");
        setAddressEditMode(false);
        setBannerEditMode(false);
        setShopInfoEditMode(false);
        // Re-sync with the server data.
        refetch();
      }
    } catch (error) {
      toast.error("Error updating profile");
      // On error, revert the optimistic update.
      setOptimisticUserData(previousUserData);
    }
  };

  return (
    <div className="mx-auto bg-gray-50 md:bg-white md:px-6 px-3 md:py-6 py-2 rounded-2xl">
      {/* <h2 className="text-lg md:text-xl font-semibold text-slate-700 hidden md:block">
        {type === "user" ? "My Profile" : "User Profile"}
      </h2> */}
      <SidebarText text="My Profile"/>
      <AccountInformation
        type={type}
        edit={true}
        editMode={bannerEditMode}
        setEditMode={setBannerEditMode}
        user={formData}
        userData={optimisticUserData}
        handleImageChange={handleImageChange}
        handleChange={handleChange}
        handleSave={handleSubmit}
        className="w-full"
        setFormData={setFormData}
        UploadImage={UploadImage}
      />
      <Address
        type={type}
        data={formData}
        userAddress={optimisticUserData?.address}
        edit={true}
        editMode={addressEditMode}
        setEditMode={setAddressEditMode}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={isLoading}
        divisionsData={bangladeshData}
        onDivisionChange={handleDivisionChange}
        onDistrictChange={handleDistrictChange}
        onThanaChange={handleThanaChange}
      />
      <ShopAddress
        type={type}
        data={formData}
        userShop={optimisticUserData?.shop}
        edit={true}
        editMode={shopInfoEditMode}
        setEditMode={setShopInfoEditMode}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={isLoading}
        divisionsData={bangladeshData}
        onShopDivisionChange={handleShopDivisionChange}
        onShopDistrictChange={handleShopDistrictChange}
        onShopThanaChange={handleShopThanaChange}
      />
    </div>
  );
}

export default MyProfile;