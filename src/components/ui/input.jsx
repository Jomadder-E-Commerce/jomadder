import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
        type={type}
        className={cn(
          "block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none transition-all duration-200 ease-in-out hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
  );
});
Input.displayName = "Input";

export { Input };
