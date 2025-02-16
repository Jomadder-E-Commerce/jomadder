"use client"
import { useGetToAllBannerQuery } from "@/components/Redux/services/homeBannerApi";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";

export default function BannerLayout() {
    const { data, isLoading } = useGetToAllBannerQuery();
    console.log(data)
  return (

    <div className="flex flex-col gap-4   md:flex-row container md:px-[27.2px] px-0 no-padding">
      <div className="h-[160px] md:h-80 xl:h-[calc(100vh-420px)] 2xl:max-h-[350px] max-h-[315px] lg:w-8/12  w-full bg-gray-300 md:rounded-md rounded-none overflow-hidden shadow-lg">
        <LeftBanner isLoading={isLoading} data={data?.data?.bigBanner ?? []} />
      </div>
      <div className="hidden lg:block h-80 xl:h-[calc(100vh-420px)] 2xl:max-h-[350px] max-h-[315px]  md:w-4/12  w-full bg-gray-300  md:rounded-md rounded-none overflow-hidden shadow-lg">
        <RightBanner isLoading={isLoading} data={data?.data?.smallBanner ?? []} />
      </div>
    </div>

  );
}
