"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetCategoriesQuery } from "@/components/Redux/services/categoriesApi/categoriesApi";
import CategoriesSkeleton from "@/components/all-skeleton/CategorySkeleton/CategoriesSkeleton";
import Link from "next/link";
import FadeUp from "@/components/shared/animation/FadeUp";
import CategoryLink from "./CategoryLink";

const Categoris = () => {
  const { data, isError, isLoading: GetisLoading } = useGetCategoriesQuery();

  if (GetisLoading) {
    return <CategoriesSkeleton />;
  }
  return (
    <FadeUp className="container no-padding">
      {data?.data?.length >= 10 && (
        <div className="w-full bg-white ">
          <div className="container no-padding relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: "auto", 
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {data?.data?.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-[25%] sm:basis-1/5 md:basis-[14.28%] lg:basis-[14.28%] xl:basis-[12.5%] 2xl:basis-[10%] "
                  >
                    <CategoryLink category={category}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden lg:block">
                <CarouselPrevious className="absolute md:-left-4 lg:-left-2 hover:bg-gray-100 border-0 " />
                <CarouselNext className="absolute md:-right-4 lg:-right-2 hover:bg-gray-100 border-0" />
              </div>
            </Carousel>
          </div>
        </div>
      )}
    </FadeUp>
  );
};

export default Categoris;
