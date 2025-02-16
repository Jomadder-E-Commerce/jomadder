import { Skeleton } from "@/components/ui/skeleton";

const ProductSliderSkeleton = () => {
  return (
    <div className="">
      <Skeleton className={" w-[100%]  !bg-slate-200 md:h-[400px] h-[280px]"}></Skeleton>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-3 w-full">
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>
        <Skeleton className={"w- !bg-slate-200 h-24"}></Skeleton>

      </div>
    </div>
  );
};

export default ProductSliderSkeleton;
