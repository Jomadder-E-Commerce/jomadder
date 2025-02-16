import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
const ITEMS_PER_PAGE = 10
const CategoriesSkeleton = () => {
  return (
    <div className="container no-padding overflow-hidden">
    <div className="w-full bg-white border-b">
      <div className="container no-padding relative">
        <div className="flex items-center space-x-4 py-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full" />
              <Skeleton className="h-4 xs:h-5 sm:h-6 md:h-7 lg:h-8 w-16 sm:w-20 md:w-24 lg:w-28" />
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
          <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CategoriesSkeleton;
