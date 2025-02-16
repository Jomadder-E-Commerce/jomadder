import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    // SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { cn } from "@/lib/utils";
  
  export function DynamicSelect({
    className,
    options = [],
    value = "",
    placeholder = '', 
    label,
    required,
    onValueChange,  
    ...rest
  }) {
    return (
      <div className={cn("w-full ", className)}>
        {label && (
          <label className="flex items-center gap-1 mt-2 font-semibold">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <Select value={value} required={required} {...rest} onValueChange={onValueChange}>
          <SelectTrigger className={cn('capitalize h-[48px]', className)}>
            <SelectValue placeholder={ placeholder || label} />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              {options.map((option, idx) => (
                <SelectItem
                  className="capitalize"
                  key={typeof option === 'string' ? option : idx}
                  // value={value[idx] || option}
                  value={option} // Use value if available, otherwise option
                >
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }