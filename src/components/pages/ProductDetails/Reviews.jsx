'use client';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import Rating from '@/components/ui/Rating';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Profile from '@/assets/profile/Avatar.jpg';
import { Input } from '@/components/ui/input';
import { useAddToReviewMutation } from '@/Redux/services/reviewApi';
import { handleFormData } from '@/utils/handleFormData';
import TestRating from '@/components/ui/TestReting';
import {
  useGetProductQuery,
  useGetProductsQuery,
} from '@/Redux/services/productApiService';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import ReviewSkeleton from '@/components/AllSkeleton/ReviewSkeleton';
import { useGetUserQuery } from '@/Redux/Auth/authApi';
import avatar from '@/assets/profile/Avatar.jpg';


export default function Reviews() {
  const [showReviews, setShowReviews] = useState(false);
  const [showAddReviews, setShowAddReviews] = useState(false);
  const [rating, setRating] = useState(0);
  const ref = useRef();
  const params = useParams();
  const id = params.id;
  const { data: productData } = useGetProductQuery(id);
  // console.log(rating, 'rating');
  // const review = productData?.data?.review;
  // console.log(productData?.data?.review[0], '27 all Product');

  const { data: userData, isLoading: userLoading } = useGetUserQuery();
  // console.log(userData?.data?.user, 'userData');

  // const reviewData = [
  //   {
  //     name: 'Hasina',
  //     date: '2 days ago',
  //     rating: 4,
  //     comment:
  //       'Get specific details about this product from customers who own it.',
  //   },
  //   {
  //     name: 'Kader',
  //     date: '2 days ago',
  //     rating: 5,
  //     comment: 'Amra product nea palaia jabo na',
  //   },
  // ];

  const [addToReview, { isLoading }] = useAddToReviewMutation();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const data = handleFormData(ref, e);
    const payload = {
      ProductId: productData?.data?.result?._id,
      rating: rating,
      review: data.review,
    };
    // console.log(payload, 'payload');
    const response = await addToReview(payload);
    if (response) {
      setRating(0)
      toast.success('Review added successfully');
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };
  const toggleAddReviews = () => {
    setShowAddReviews(!showAddReviews);
  };
  const handleCancleReview = () => {
    setShowAddReviews(!showAddReviews);
  };

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  return (
    <div className="w-full border p-3 my-6">
      <div className="flex">
        <h4 className="cursor-pointer" onClick={toggleReviews}>
          Product Reviews ({productData?.data?.review?.length})
        </h4>
        {/* {showReviews && !showAddReviews && (
          <Link href="#review">
            <button
              className="text-sm text-primary ms-1 underline"
              onClick={toggleAddReviews}
            >
              Add Review
            </button>
          </Link>
        )} */}
      </div>
      {showReviews && (
        <div className="">
          <div className="mt-3">
            {productData?.data?.review?.map((data, index) => (
              <div className="my-5 border  p-2" key={index}>
                <div className="flex gap-3">
                  <Image unoptimized  
                    src={data?.userId?.photo}
                    className="rounded-full w-14 h-14 object-cover border"
                    alt="profile"
                    width={50}
                    height={50}
                  />

                  <div>
                    <p>{data?.userId?.name}</p>
                    <TestRating
                      setRating={setRating}
                      rating={data?.rating}
                      value={data?.rating || 0}
                      totalStars={5}
                    />
                    <p>{data?.review}</p>
                  </div>
                </div>

                {/* <div className="flex gap-3">
                  <p>
                    By{' '}
                    <span className="text-[#3749bb] font-semibold">
                      {data?.userId?.name}
                    </span>
                  </p>
                  <div>
                    <p>{data.date}</p>
                  </div>
                </div> */}
                {/* <Rating value={data.rating} className="text-xl mt-2" /> */}
              </div>
            ))}

            {!showAddReviews && (
              <div>
                <button
                  className="text-sm text-primary ms-1 underline"
                  onClick={toggleAddReviews}
                >
                  Add Review
                </button>
              </div>
            )}
          </div>
          <PrivateRoute>
            {showAddReviews && (
              <form ref={ref} onSubmit={handleReviewSubmit}>
                {userLoading ? (
                  <ReviewSkeleton />
                ) : (
                  <div>
                   {
                        userData?.data?.user?.photo ? <Image unoptimized  
                     className="rounded-full w-14 h-14 object-cover border"
                     src={userData?.data?.user?.photo}
                     alt="review"
                     width={70}
                     height={70}
                        /> : <Image unoptimized  
                   className="rounded-full w-14 h-14 object-cover border"
                   src={avatar}
                   alt="review"
                   width={70}
                   height={70}
                 />
                   }
                    <h4>{userData?.data?.user?.name}</h4>

                    {/* <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="mt-3 w-[500px] mb-3"
                /> */}
                    <Textarea
                      name="review"
                      placeholder="  Write a review"
                      className="mt-3 w-[500px] mb-3"
                    />
                    {/* <Rating  name="rating" className="text-xl my-2" /> */}
                    <TestRating
                      rating={rating}
                      setRating={setRating}
                      value={rating}
                      name="rating"
                      totalStars={5}
                    />
                    <Button type="submit">Add a Review</Button>
                    <Button className="ms-2" onClick={handleCancleReview}>
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            )}
          </PrivateRoute>
        </div>
      )}
      {/* <div className="">
        <div className="mt-3">
          {reviewData.map((data, index) => (
            <div className="my-4" key={index}>
              <p>{data.comment}</p>
              <div className="flex gap-3">
                <p>
                  By{' '}
                  <span className="text-[#3749bb] font-semibold">
                    {data.name}
                  </span>
                </p>
                <div>
                  <p>{data.date}</p>
                </div>
              </div>
              <Rating value={data.rating} className="text-xl mt-2" />
            </div>
          ))}
        </div>
        <Textarea
          placeholder="Write a review"
          className=" mt-3 w-[500px] mb-3"
        />
        <Button>Add a Review</Button>
      </div> */}
    </div>
  );
}
