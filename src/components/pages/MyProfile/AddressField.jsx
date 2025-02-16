import { Skeleton } from "@/components/ui/skeleton";


const AddressField = ({ label, value, loading }) => {
    if (loading) {
      return <Skeleton className="h-8 w-full" />;
    }
  
    return (
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-medium ">{value || "---"}</p>
      </div>
    );
  };

  export default AddressField