import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-100">
          <TableRow>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-12 sm:w-16 md:w-20 lg:w-24 bg-slate-200" />
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array(8)
                  .fill(0)
                  .map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton
                        className="h-6 w-10 sm:w-12 md:w-16 lg:w-20 bg-slate-200"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
