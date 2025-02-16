import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

const BannerPreview = ({ images, bannerType, handleImageUploadCancel }) => {
  return (
    <div className="lg:col-span-2 col-span-1 relative rounded-lg mt-10 mb-10 md:mb-0 group">
      {images && (
        <Image
          unoptimized
          src={images[0]}
          width={1000}
          height={1000}
          className={`h-[500px] lg:col-span-2 col-span-1 rounded-lg object-cover ${
            bannerType === "banner" ? "w-full" : "md:w-1/3 mx-auto"
          }`}
          alt={`${bannerType} preview`}
        />
      )}
      <button
        type="button"
        onClick={handleImageUploadCancel}
        className={`absolute text-xs text-white transition-opacity hover:opacity-100 duration-200 bg-red-500 rounded-md opacity-0 group-hover:opacity-80 ${
          bannerType === "banner" ? "top-0 right-0" : "top-0 right-0 md:right-1/3"
        }`}
      >
        <IoCloseSharp className="text-xl text-white" />
      </button>
    </div>
  );
};

export default BannerPreview;
