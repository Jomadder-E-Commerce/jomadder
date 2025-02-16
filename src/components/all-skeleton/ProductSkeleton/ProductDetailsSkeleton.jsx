import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductDetailsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 min-h-[300px]">
        <div className="">
          <Skeleton className={"w-full md:w-[90%] !bg-slate-200 md:h-7 h-8"} />
          <Skeleton className={"w-52 mt-5 md:mt-8 !bg-slate-200 md:h-7 h-8"} />
        </div>
        <div className="flex gap-2 md:gap-5">
        <Skeleton className={"md:w-24 !bg-slate-200 md:h-20 h-16 w-16 md:mt-2"}></Skeleton>
        <Skeleton className={"md:w-24 !bg-slate-200 md:h-20 h-16 w-16 md:mt-2"}></Skeleton>
        <Skeleton className={"md:w-24 !bg-slate-200 md:h-20 h-16 w-16 md:mt-2"}></Skeleton>
        <Skeleton className={"md:w-24 !bg-slate-200 md:h-20 h-16 w-16 md:mt-2"}></Skeleton>
          
        </div>
        <Table className="border border-gray-200 mt-3">
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index} className="border-b border-gray-200">
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
