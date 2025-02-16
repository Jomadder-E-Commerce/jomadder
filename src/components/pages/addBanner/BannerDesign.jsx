"use client";

import { ImageHosting } from "@/components/shared/Cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  useAddToBannerMutation,
  useAddTosideBannerMutation,
} from "@/components/Redux/services/homeBannerApi";
import { useRef, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { toast } from "react-toastify";
import AddedBanner from "./AddedBanner";
import { GoPlus } from "react-icons/go";
import BannerPreview from "./BannerPreview";

const BannerDesign = ({ bannerType, note }) => {
  const [images, setImages] = useState("");
  const ref = useRef();

  const [addToBanner] = useAddToBannerMutation();
  const [addTosideBanner] = useAddTosideBannerMutation();
  const [showBanner, setShowBanner] = useState(false);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return; 
  
    try {
      const uploadResponse = await ImageHosting(files[0]);
      if (uploadResponse && uploadResponse.url) {
        setImages([uploadResponse.url]);
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleImageUploadCancle = () => {
    try {
      if (bannerType === "banner") {
        setImages("");
        toast.success("Item removed from banner successfully");
      } else {
        setImages("");
        toast.success("Item removed from side banner successfully");
      }
    } catch (error) {
      toast.error(`Failed to remove ${bannerType} banner item`);
    }
  };

  const handelBanner = async (e) => {
    e.preventDefault();
    const payload = {
      bannerImage: images[0],
    };

    try {
      if (bannerType === "banner") {
        const { data: bannerData } = await addToBanner(payload);
        if (bannerData) {
          toast.success("Banner added successfully");
          setImages("");
        }
      } else {
        const { data: bannerData } = await addTosideBanner(payload);
        if (bannerData) {
          toast.success("Sidebar Banner added successfully");
          setImages("");
        }
      }
    } catch (error) {
      toast.error(`Image is already exist`);
      console.error(error, "bannerError");
    }
  };

  return (
    <section className="container">
      <div className="lg:mt-[5rem] flex text-center justify-center">
        <div className="relative">
          <h1 className="md:text-3xl text-xl font-semibold">
            {bannerType.charAt(0).toUpperCase() + bannerType.slice(1)} Design
          </h1>
          <p className="text-foreground">Design the {bannerType} as you wish</p>
        </div>
      </div>
      <AddedBanner bannerType={bannerType} />
      <Button
        onClick={() => setShowBanner((prev) => !prev)}
        className="flex items-center my-4 gap-1"
      >
        {!showBanner && <GoPlus />}
        {showBanner ? "Cancel" : "Add Banner"}
      </Button>
      {showBanner && <form ref={ref} onSubmit={handelBanner} className=" max-w-3xl md:mt-10 gap-5">
        <div className="lg:col-span-2 col-span-1 flex flex-col gap-5">
          <Label>
            {bannerType.charAt(0).toUpperCase() + bannerType.slice(1)} Image
          </Label>
          <Label
            className={cn("border-gray-300 border px-4 py-6 rounded-lg", {
              "justify-around": !images.length,
            })}
          >
            <div
              className={`flex justify-center flex-col items-center text-center cursor-pointer gap-3 ${images.length >= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <ImFilePicture className="text-3xl text-muted-foreground" />
              <div className="text-gray-400">
                <p className="mb-3">Drop images or</p>
                <p className="text-blue-500 underline">click to browse</p>
              </div>
            </div>
            <Input
              id="imageUpload"
              name="bannerImage"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={images.length >= 1}
            />
          </Label>
          <Input className="hidden" name="image" value={images} readOnly />
        </div>
        <p className="mt-3"><span>Note:</span> {note}</p>

        {/* Preview Banner */}
        <BannerPreview
          images={images}
          bannerType={bannerType}
          handleImageUploadCancel={handleImageUploadCancle}
        />

        <div>
          <Button type="submit" className="px-16 py-2 md:my-8" disabled={!images.length}>
            Submit
          </Button>
        </div>
      </form>}
    </section>
  );
};

export default BannerDesign;
