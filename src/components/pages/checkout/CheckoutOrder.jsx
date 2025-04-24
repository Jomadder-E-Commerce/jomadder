"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { setMessage } from '@/components/Redux/features/AllSlice/checkoutSlice';
import { useDeleteCartAllMutation, useGetCheckallQuery } from '@/components/Redux/services/cartApi';
import { usePostcheckoutMutation } from '@/components/Redux/services/checkout/checkoutAPi';
import { useTryCouponMutation } from '@/components/Redux/services/couponApi';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { removeDataFromLocalStorage } from '@/utils/localstorage';
import { FaX } from 'react-icons/fa6';

const CheckoutOrder = ({ data }) => {
  const [postcheckout, { isLoading: postloading, isSuccess }] = usePostcheckoutMutation()
  // const [deleteCartAll] = useDeleteCartAllMutation()
  const [coupon, setCoupon] = useState("")
  const [tryCoupon] = useTryCouponMutation()
  const [couponUsed,setCouponUsed] = useState(false)
  const [finalCoupon, setFinalCoupon] = useState("")
  const [couponAmount, setCouponAmount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null);
  // console.log(data,"checkout data order")
  const path = usePathname();
  const products = Array.isArray(data) ? data : [data];
  // const { data: Checkall } = useGetCheckallQuery();
  const calculateTotal = () => {
    let totalPrice = 0;
  
    if (path && path.includes('buyNow') && selectedProduct) {
      const products = selectedProduct?.skus;
      if (selectedProduct?.skus?.length) {
        products?.forEach((sku) => {
          totalPrice += sku.quantity * parseFloat(sku.price || 0);
        });
      }
    } else if (products?.length) {
      products.forEach((product) => {
        if (product?.checked) {
          product.skus.forEach((sku) => {
            totalPrice += sku.quantity * parseFloat(sku.price || 0);
          });
        }
      });
    }
    return totalPrice || 0; // Default to 0 if no valid products are found
  };
  const totalPrice = Math.round(calculateTotal().toFixed(2));
  const payNow = Math.round(calculateDiscount(totalPrice, couponAmount));

  // const charge = payNow > 0 ? Math.round((payNow / 100)*1.5) : 0
  const discountPrice = payNow > 0 ? Math.round((totalPrice / 100) * couponAmount) : 0

    const { isFormValid, message, formData  } = useSelector((state) => state.checkout);
    // console.log(formData)
    const dispatch = useDispatch();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlePlaceOrder = async() => {
      // console.log(isFormValid)
        if (isFormValid) {
            // const price = Math.round(parseFloat(payNow).toFixed(2) + charge)
            const payload = {...formData, products:products.map(item => {
              return {...item, productId:item.id}
            }), price:payNow,
            charge:0, 
            discount : discountPrice}
            // console.log(payload)
            const res = await postcheckout(payload)
            // console.log(res?.data);
            if(res?.data?.data?.transaction?.orderId){
              router.push(`/payment?orderId=${res?.data?.data?.transaction?.orderId}`)
              // console.log(res?.data?.data?.transaction?.orderId, "this is res");
              if (path && path.includes('buyNow')){
                removeDataFromLocalStorage("buyNowData")
              }
              else{
                removeDataFromLocalStorage("cart")
              }
              
            }
        } else {
            // Show modal with validation message
            setIsModalOpen(true);
        }
    };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setMessage(""));  // Optionally clear the message
  };

    const handleCoupon = async()=>{
      if(!coupon){
         toast.error("Please write the coupon")
      }
      try{
        const {data } = await tryCoupon(coupon);
        if(data){
          setCouponAmount(data?.data?.offer)
          setCouponUsed(true)
          setFinalCoupon(coupon)
          setCoupon("")
          toast.success("Coupon added")
        }
        else{
          toast.error("The coupon is not valid")
          setCouponAmount(0)
        }
    }
    catch (err) {
      toast.error("The coupon is not valid")
      setCouponAmount(0)
    }
  }
  useEffect(() => {
    if (path && path.includes('buyNow')) {
      const storedData = localStorage.getItem('buyNowData');
      if (storedData) {
        setSelectedProduct(JSON.parse(storedData));
      }
    }
  }, [path]);
  

  function calculateDiscount(originalPrice, discountPercentage) {
    if (!originalPrice || !discountPercentage) return originalPrice || 0;
    const discount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discount;
  }
  

    return (
        <div className='w-full h-full lg:max-w-[620px] lg:my-0 my-5 border bg-white p-4 rounded-md'>
            {/* Product Price */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-600">Product Price</h3>
                 <p className="text-lg font-semibold">৳{payNow}</p>
               
                
            </div>
            {/* <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-600">Charge</h3>
                 <p className="text-lg font-semibold">৳{charge}</p>
               
                
            </div> */}
            {couponUsed &&   <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-600">Coupon</h3>
                 <p className="text-lg font-semibold">-৳{discountPrice}</p>
               
                
            </div>}

            {/* Payment Info */}
            <div className="p-4 mb-4 bg-gray-100 rounded-md">
                <p className="mb-2 text-lg font-semibold text-center">
                    Total price - <span className="font-bold">৳{payNow}</span>
                </p>
                <p className="text-center text-gray-600">
                    Pay on Delivery : Freight + Tax cost
                </p>
            </div>             
            {/* Coupon Code */}
           

            <div className="flex items-center mb-2">
                <input
                   value={coupon}
                   onChange={(e)=>{setCoupon(e.target.value)}}
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full p-[7px] border outline-none rounded-l-md "
                />
                <Button onClick={handleCoupon} className="p-2 text-white rounded-none bg-primary rounded-r-md">
                    Apply
                </Button>
            </div>
            
            {/* Place Order Button */}

            {
              couponAmount ?  <div className='w-full bg-green-300 mb-6 rounded-lg sm:px-4 px-3 py-2 flex  items-center justify-between sm:text-base text-sm'>
              <p>{finalCoupon} - {couponAmount} % <span className="xsm:text-base text-[0px]">discount applied </span></p> <button onClick={()=>{setCouponAmount(0); setCouponUsed(false);setFinalCoupon("")}}><FaX/></button>
            
            </div> : ""
            }
           
            <Dialog>

        <DialogTrigger asChild>
          <Button className="w-full py-2 text-lg font-medium text-white rounded-md bg-primary">
            Place Order & Pay
          </Button>
        </DialogTrigger>
        <DialogContent>

          {/* Scrollable Terms and Conditions Content */}
          <div className="max-w-lg h-[350px] p-4 mx-auto overflow-y-scroll custom-scrollbar  rounded-lg  space-y-4">
            <DialogTitle className="text-center font-semibold text-lg">শর্ত সমূহ</DialogTitle>
            <hr />

            <ul className="list-disc pl-5 text-sm">
              <li>অর্ডার প্লেসের পরে আপনার সাপ্লায়ার থেকে আমাদের চায়না ওয়্যারহাউস পর্যন্ত প্রডাক্ট পৌছানোর ডেলিভারির চার্জ (চায়না লোকাল ডেলিভারি চার্জ) ধার্য হবে।</li>
            </ul>
            <ul className="list-disc pl-5 text-sm">
              <li>উল্লেখিত পণ্যের ওজন সম্পূর্ণ সঠিক নয়, আনুমানিক মাত্র। বাংলাদেশে আসার পর পণ্যটির প্রকৃত ওজন মেপে শিপিং চার্জ হিসাব করা হবে।</li>
            </ul>
            <ul className="list-disc pl-5 text-sm">
              <li>পণ্যের ক্যাটাগরীর উপর নির্ভর করে শিপিং চার্জ নির্ধারণ করা হবে ৳ 750 / 1150 Per Kg</li>
            </ul>
            <ul className="list-disc pl-5 text-sm">
              <li>আমরা সেলার কিংবা উৎপাদক নই। সকল পণ্য সম্পর্কে আমাদের স্পষ্ট ধারণা রাখা সম্ভব নয় । তাই পণ্যের মানের বিষয়ে আমাদের কোনো দ্বায়বদ্ধতা থাকবে না। শুধুমাত্র যদি সেলার ভুল,অথবা কম পণ্য দিয়ে থাকে তাহলেই আমরা সেলার থেকে রিফান্ড পাওয়া সাপেক্ষে কাস্টমারকে রিফান্ড দিতে বাধ্য থাকবো।</li>
            </ul>
            <ul className="list-disc pl-5 text-sm">
              <li>প্রোডাক্ট স্ট্যাটাস অন দ্যা ওয়ে টু ডেলিভারি ( বিডি লোকাল ) স্ট্যাটাস হবার পর থেকে পরবর্তী সাত দিনের মদ্ধ্যে আফটার সেলস সার্ভিসের জন্য আবেদন বা সাপোর্ট টিকেট ওপেন করতে হবে! অন্যথায় তা গ্রহনযোগ্য হবে না।</li>
            </ul>
            <ul className="list-disc pl-5 text-sm">
              <li>ভুল প্রোডাক্ট, রিজেক্ট বা নষ্ট প্রোডাক্ট অথবা প্রোডাক্ট মিসিং সংক্রান্ত সমস্যার সমাধানে আফটার সেলস সার্ভিসটি গ্রহন করে দ্রুত সমাধান পেতে পারেন।</li>
            </ul>
            <hr />
            <h3 className='text-center font-semibold '>শিপিং চার্জ</h3>
            <hr />
            <h3 className=' font-semibold text-sm'>ক্যাটাগরিঃ এ - ৭৫০ টাকা প্রতি কেজি</h3>
            <p className='text-sm'>প্রতি কেজি জুতা, ব্যাগ, জুয়েলারী,যন্ত্রপাতি, স্টিকার, ইলেকট্রনিক্স, কম্পিউটার এক্সেসরীস, সিরামিক, ধাতব, চামরা, রাবার,প্লাস্টিক জাতীয় পন্য, ব্যাটারি ব্যাতিত খেলনা।</p>
            <h3 className=' font-semibold text-sm'>ক্যাটাগরিঃ বি - ১১০০ টাকা প্রতি কেজি</h3>
            <p className='text-sm'>ব্যাটারি জাতীয় যেকোণ পন্য, ডুপ্লিকেট ব্রান্ড বা কপিঁ পন্য, জীবন্ত উদ্ভিদ, বীজ,রাসায়নীক দ্রব্য,নেটওয়ার্কিং আইটেম, ম্যাগনেট বা লেজার জাতীয় পন্য।</p>
            <h3 className=' font-semibold text-sm'>ক্যাটাগরিঃ সি</h3>
            <p className='text-sm'>পোশাক বা যেকোন গার্মেন্টস আইটেম ৮০০ টাকা ,খাদ্য ১২০০ টাকা, ছাতা ৮০০,হিজাব /ওড়না ৮৫০ টাকা,পাউডার ১২০০,সানগ্লাস-৩৫০০ ,সি সি ক্যামেরার ১৫০০ টাকা,তরল পণ্য বা কসমেটিক্স ১১৫০ টাকা, শুধু ব্যাটারি বা পাওয়ার ব্যাংক ১৩৫০ টাকা, স্মার্ট ওয়াচ ১২০০ টাকা , সাধারন ঘড়ি ১১০০ টাকা , Bluetooth হেডফোন ১১০০ টাকা।</p>


          </div>

          <DialogFooter className="">

            <DialogClose>
              <button className="px-4  border-2 py-2  bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
                Cancel
              </button>
            </DialogClose>

            <button
              onClick={handlePlaceOrder}
              className={`px-4 w-full py-2 text-white rounded-md bg-primary`}
            >
              {postloading ? "Accept & Place Ordering..." : "Accept & Place Order"}
            </button>

            {/* Validation Message Modal */}

          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle className="text-center font-semibold text-lg">Delivery Information</DialogTitle>
          <p className="text-center text-gray-600 mb-4">{message || "Please provide your name & delivery information properly to place an order."}</p>
          <DialogFooter className="flex justify-center">
            <Button onClick={handleCloseModal} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

const CheckoutOrderWrapper = ({ data = [] }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CheckoutOrder data={data} />
  </Suspense>
);

export default CheckoutOrderWrapper;