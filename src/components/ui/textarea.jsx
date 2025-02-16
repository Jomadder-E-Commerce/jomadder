import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, label, ...props }, ref) => {
  const { required, error, name } = { ...props };
  return (

    <>
      {label &&
        <label
          htmlFor={name}
          className="flex items-center gap-1  mb-2 font-semibold"
        >
          {label?.endsWith('*') ? label.slice(0, -1) : label}
          <span className="text-red-500">{label?.endsWith('*') && '*'}</span>
          {required && <span className="text-red-500">*</span>}
        </label>}
        <textarea
      className={cn(
        "block min-h-[80px] w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm placeholder-gray-400 resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none transition-all duration-200 ease-in-out hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
      <span className="text-xs text-red-500">{error}</span>
    </>
  );
})
Textarea.displayName = "Textarea"

export { Textarea }


// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Textarea = React.forwardRef(({ className, ...props }, ref) => {
//   return (
//     (<textarea
//       className={cn(
//         // "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//         "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       ref={ref}
//       {...props} />)
//   );
// })
// Textarea.displayName = "Textarea"

// export { Textarea }
