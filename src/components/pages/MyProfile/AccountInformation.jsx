"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import avatar from "@/assets/profile/Avatar.jpg";
import { toast } from "react-toastify";
import { ImageHosting } from "@/components/shared/Cloudinary";

const AccountInformation = ({
  user,
  userData,
  edit,
  editMode,
  setEditMode,
  handleImageChange,
  handleChange,
  handleSave,
  type,
  setFormData,
  UploadImage
}) => {
  const openModal = () => setEditMode(true);
  const closeModal = () => setEditMode(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(userData?.photo);
  
  const onImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size too large. Please upload an image under 5MB.");
      return;
    }

    // Set image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image
    setIsImageUploading(true);
    try {
      const uploadImageResponse = await ImageHosting(file);
      const photoUrl = uploadImageResponse.url;

      // Update form data with the new image URL
      // handleImageChange(file, () => {
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     photo: photoUrl,
      //   }));
      //   toast.success("Image uploaded successfully!");
      // });
      UploadImage(photoUrl)
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.log(error)
    } finally {
      setIsImageUploading(false);
    }
  };
  useEffect(()=>{
    if(userData?.photo){
      setImagePreview(userData?.photo)
    }
   
  },[userData?.photo])
  return (
    <>
      {/* Profile & Information Card */}
      <div className="p-6 my-6 bg-white border shadow-sm rounded-xl">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          {/* Profile Section */}
          <div className="flex flex-col items-center md:border-r md:pr-8">
            <div className="relative w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-md">
              <Image
                alt="User Profile"
                src={imagePreview || avatar}
                height={100}
                width={100}
                className="object-cover w-full h-full"
              />
              {type === "user" && edit && (
                <label className="absolute bottom-0 right-0 p-2 transition-colors bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                    disabled={isImageUploading}
                  />
                  {isImageUploading ? (
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-full border-t-transparent animate-spin" />
                  ) : (
                    <MdOutlineEdit className="w-4 h-4 text-gray-600" />
                  )}
                </label>
              )}
            </div>
            <div className="mt-3 text-lg font-medium text-gray-800">
              {userData?.name || "Your Name"}
            </div>
          </div>

          {/* Information Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Personal Information
              </h2>
              <button
                onClick={openModal}
                aria-label="Edit Personal Information"
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                <MdOutlineEdit className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col mt-4 overflow-auto md:gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-row items-center pb-2">
                  <Label className="text-gray-700 ">Name:</Label>
                  <span className="ml-2 text-gray-600">
                    {userData?.name || "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center pb-2">
                  <Label className="text-gray-700 ">Email:</Label>
                  <span className="ml-2 text-gray-600 text-wrap">
                    {userData?.email || "-"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-row items-center pb-2">
                  <Label className="text-gray-700 ">Phone:</Label>
                  <span className="ml-2 text-gray-600">
                    {userData?.phone || "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center pb-2">
                  <Label className="text-gray-700 ">Date of Birth:</Label>
                  <span className="ml-2 text-gray-600">
                    {userData?.dateofbirth || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <Dialog open={editMode} onOpenChange={closeModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Personal Information</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="name" className="block text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-gray-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={user.phone}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="dateofbirth" className="block text-gray-700">
                  Date of Birth
                </Label>
                <Input
                  id="dateofbirth"
                  name="dateofbirth"
                  type="date"
                  value={user.dateofbirth}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gender" className="block text-gray-700">
                  Gender
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 text-gray-700 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleSave}
                  disabled={isImageUploading}
                  className={`bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors ${
                    isImageUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isImageUploading ? "Uploading..." : "Save"}
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 text-gray-700 transition-colors bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AccountInformation;