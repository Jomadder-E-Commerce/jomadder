import { Skeleton } from '../ui/skeleton';

const FormSkeleton = () => {
  return (
    <div className=" space-y-5 mt-5 container">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-11 ml-2 mb-3  w-44 bg-slate-300" />
        <Skeleton className="h-10 ml-2  w-24 bg-slate-300" />
      </div>
      <div className="md:flex gap-2 ">
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
      </div>
      <div className="md:flex gap-2 ">
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
      </div>
      <div className="md:flex gap-2 ">
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
      </div>
      <div className="md:flex gap-2 ">
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
      </div>
      <div className="md:flex gap-2 ">
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
        <Skeleton className="h-10 ml-2 mb-3 w-full md:w-1/2 bg-slate-300" />
      </div>
    </div>
  );
};

export default FormSkeleton;
