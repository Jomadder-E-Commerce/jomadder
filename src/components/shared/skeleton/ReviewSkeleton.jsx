import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Star } from 'lucide-react'
const ReviewSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
           {[...Array(5)].map((_, index) => (
              <Card key={index} className="w-full shadow-lg animate-pulse">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Avatar className="w-10 h-10 mr-3 bg-gray-200" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="w-4 h-4 text-gray-200" />
                    ))}
                    <div className="ml-2 h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pl-6 py-3">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </CardFooter>
            </Card>
           ))}
        </div>
      
    );
};

export default ReviewSkeleton;