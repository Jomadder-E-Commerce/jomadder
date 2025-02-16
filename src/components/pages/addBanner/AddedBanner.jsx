import {
  useGetToBannerAdminQuery,
  useGetTosideBannerAdminQuery,
  useRemoveToBannerMutation,
  useRemoveTosideBannerMutation,
  useUpdateToBannerMutation,
  useUpdateTosideBannerMutation,
} from "@/components/Redux/services/homeBannerApi";
import Image from "next/image";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from "sweetalert2";

export default function AddedBanner({ bannerType }) {
  const { data: banner, error: bannerError } = useGetToBannerAdminQuery();
  const { data: sideBanner, error: sideBannerError } = useGetTosideBannerAdminQuery();

  const [removeToBanner] = useRemoveToBannerMutation();
  const [removeTosideBanner] = useRemoveTosideBannerMutation();
  const [updateToBanner] = useUpdateToBannerMutation();
  const [updateTosideBanner] = useUpdateTosideBannerMutation();

  const handelDeleteBanner = async (id) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "This banner will be permanently removed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (isConfirmed) {
        if (bannerType === "banner") {
          await removeToBanner(id);
          toast.success("Removed from banner successfully");
        } else {
          await removeTosideBanner(id);
          toast.success("Removed from side banner successfully");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove banner");
    }
  };

  const handleToggleIsActive = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; 

      if (bannerType === "banner") {
        await updateToBanner({
          id,
          body: { isActive: newStatus },
        });
        toast.success(`Banner ${newStatus ? "activated" : "deactivated"} successfully`);
      } else {
        await updateTosideBanner({
          id,
          body: { isActive: newStatus },
        });
        toast.success(`Side banner ${newStatus ? "activated" : "deactivated"} successfully`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update banner status");
    }
  };
  const bannerData = bannerType === "banner" ? banner : sideBanner;

  return (
    <section className="">
      {/* <h3>Added {bannerType === "banner" ? "Main Banner" : "Side Banner"}</h3> */}
      <div className={`grid gap-5 mt-10 ${bannerType === 'banner' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {bannerData?.data?.map((banner, index) => (
          <div key={index} className="relative rounded-lg">
            <Image unoptimized
              src={banner?.bannerImage}
              alt="banner"
              width={500}
              height={300}
              className={`object-cover h-[300px] w-full rounded-lg`}
            />
            <Checkbox
              className="absolute top-0 right-7 w-6 h-6 transition-opacity bg-white text-primary duration-200 mt-1 mr-1"
              checked={banner.isActive}
              onClick={() => handleToggleIsActive(banner._id, banner.isActive)}
            />
            <button
              type="button"
              onClick={() => handelDeleteBanner(banner._id)}
              className="absolute top-0 right-0 text-xs text-white transition-opacity duration-200 bg-red-500 rounded-full mt-1 mr-1"
            >
              <IoCloseSharp className="text-2xl text-white" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
