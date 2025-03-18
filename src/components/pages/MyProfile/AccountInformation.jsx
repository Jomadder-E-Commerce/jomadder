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
import AddressField from "./AddressField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DynamicSelect } from "@/components/ui/DynamicSelect";
import { DatePicker } from './../../ui/DatePicker';

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
  UploadImage,
  loading,
  handleGenderChange
}) => {
  const openModal = () => setEditMode(true);
  const closeModal = () => setEditMode(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(userData?.photo);

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size too large. Please upload an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setIsImageUploading(true);
    try {
      const uploadImageResponse = await ImageHosting(file);
      UploadImage(uploadImageResponse.url);
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsImageUploading(false);
    }
  };

  useEffect(() => {
    if(userData?.photo) setImagePreview(userData.photo);
  }, [userData?.photo]);

  return (
    <>
      <div className="p-6 my-6 bg-white border shadow-sm rounded-xl">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="flex flex-col items-center md:border-r md:pr-8">
          <div className="relative w-24 h-24">
  <div className="overflow-hidden bg-gray-100 rounded-full shadow-md w-24 h-24">
    <Image
      alt="User Profile"
      src={imagePreview || avatar}
      height={100}
      width={100}
      className="object-cover w-full h-full"
    />
  </div>
  {type === "user" && edit && (
    <label className="absolute -bottom-1 -right-1 p-1.5 transition-colors bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 border-2 border-white">
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
              {user.name || "Your Name"}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Personal Information
              </h2>
              <button
                onClick={openModal}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                <MdOutlineEdit className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col mt-4 overflow-auto md:gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AddressField label="User Name" value={user?.name} loading={loading} />
                <AddressField label="User email" value={user?.email} loading={loading} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-0 mt-4">
                <AddressField label="Phone" value={user?.phone} loading={loading} />
                <AddressField label="Date of Birth" value={user?.dateofbirth} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <Dialog open={editMode} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Personal Information</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-4">
              <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user.name || ""}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                
                {(userData?.loginBy === "Email" || userData?.loginBy === "Google") ? (
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={user.phone || ""}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email || ""}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="dateofbirth">Date of Birth</Label>
                  <Input
                    id="dateofbirth"
                    type="date"
                    value={user.dateofbirth || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <DynamicSelect
                    id="gender"
                    className="w-full"
                    options={["male", "female"]}
                    value={user.gender || ""}
                    placeholder="Select Gender"
                    onValueChange={handleGenderChange}
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleSave}
                  disabled={isImageUploading}
                  className={`bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 ${
                    isImageUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isImageUploading ? "Uploading..." : "Save"}
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
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