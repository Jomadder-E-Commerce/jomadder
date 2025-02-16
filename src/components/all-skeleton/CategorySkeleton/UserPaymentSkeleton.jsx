import { Card, CardContent } from "@/components/ui/card";

const UserPaymentSkeleton = ({ categoryLength }) => {
  return (
    <div className="">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="group">
            <Card>
              <CardContent className="flex flex-row items-center justify-center p-4 md:flex-col">
               <div className="flex gap-2 justify-center items-center">
               <div className=" w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
               <div className="w-[120px] h-[40px] bg-gray-200 animate-pulse" />
               </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="p-4 mt-4 border  rounded-lg space-y-2 bg-white">                               
      <div className=" h-4 w-72 bg-gray-200 animate-pulse"/>                                                        
      <div className=" h-4 w-72 bg-gray-200 animate-pulse"/>                                                        
      <div className=" h-4 w-60 bg-gray-200 animate-pulse"/>                                                        
         </div>
    </div>
  );
};

export default UserPaymentSkeleton;