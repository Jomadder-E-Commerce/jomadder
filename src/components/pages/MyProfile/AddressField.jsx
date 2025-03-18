import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";


const AddressField = ({ label, value, loading , className }) => {
    if (loading) {
      return <Skeleton className="h-8 w-full" />;
    }
  
    return (
      <div className={cn("space-y-1", className)}>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-medium ">{value || "---"}</p>
      </div>
    );
  };

  export default AddressField