import { Card, CardContent } from "@/components/ui/card";

const CategorySkeleton = ({ categoryLength }) => {
  return (
    <div className="lg:my-10 my-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[...Array(categoryLength)].map((_, idx) => (
          <div key={idx} className="group">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4 md:flex-col">
                {/* Skeleton for Image */}
                <div className="w-[120px] h-[60px] bg-gray-200 animate-pulse" />

                {/* Skeleton for Title */}
                <div className="mt-2 w-[80px] h-4 bg-gray-200 animate-pulse" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
