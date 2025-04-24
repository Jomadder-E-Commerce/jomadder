import { useGetReviewsQuery } from '@/components/Redux/services/productApi/productApi';
import React from 'react';
import ReviewCard from './ReviewCard';
import ReviewSkeleton from '@/components/shared/skeleton/ReviewSkeleton';

const Reviews = ({id}) => {
    const {data, isLoading, isError} = useGetReviewsQuery(id)
    // console.log("reviews",data?.data?.data?.list)
    return (
        <>
        {
            isLoading ? <ReviewSkeleton/> :<div className="flex flex-col gap-4">
            
            {
                data?.data?.data ? data?.data?.data?.list?.map((item, index) => (
                    <ReviewCard key={index} {...item}/>
                )) : <h2 className="text-center my-3">No Reviews</h2>
                
            }
        </div>
        }
        
        </>
        
    );
};

export default Reviews;