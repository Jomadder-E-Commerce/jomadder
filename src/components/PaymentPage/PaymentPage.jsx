"use client"

import Image from 'next/image';
import { Input } from '../ui/input';
import cart from '@/assets/AllCategories/approved-delivery.png';
import { Suspense, useEffect, useState } from 'react';
import { Vault, X } from 'lucide-react';
import payment from '@/assets/payment/payment.png';
import CartProductSkeleton from '../all-skeleton/cartSkeleton/CartProductSkeleton';
import { useGetProductDetailsQuery } from '../Redux/services/checkout/checkoutAPi';
import { useGetpaymentQuery } from '../Redux/services/paymentMethods/paymentApi';
import UserPaymentSkeleton from '../all-skeleton/CategorySkeleton/UserPaymentSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUpdateTransactionMutation } from '../Redux/services/transactionApi';
import { toast } from 'react-toastify';
import { ImageHosting } from '../shared/Cloudinary/Cloudinary';
import Link from 'next/link';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useGetUserQuery, useGetVerifyQuery } from '../Redux/services/AuthenticationApi/AuthenticationApi';
import { useTryDepositMutation, useUseDepositMutation } from '../Redux/services/depositApi/depositApi';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { data: OrderDetailsData, isLoading, isSuccess: orderIsSuccess } = useGetProductDetailsQuery(orderId);
  const [tryDeposit, { isLoading: depositLoading, isSuccess: depositSuccess }] = useTryDepositMutation();
  const [updateTransaction, { isLoading: transactionLoading, isSuccess }] = useUpdateTransactionMutation();
   const { data:userData, isLoading:loadingUser, isError: getUserError, refetch } = useGetVerifyQuery();
   console.log("user",OrderDetailsData?.data?.price)
  const router = useRouter()
  const { data: paymentData, isLoading: paymentLoading } = useGetpaymentQuery()
  const [charge,setCharge] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedMethodName,setSelectedMethodName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
   const [paymentProcess,setPaymentProcess] = useState(false)
  const IsDipositUseable = userData?.data?.deposit >= OrderDetailsData?.data?.price
  const [Hover, setHover] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    OrderDetailsData?.data?.products.forEach(product => {
      product.skus.forEach(sku => {
        totalPrice += sku.quantity * parseFloat(sku.price);
      });
    });
    return totalPrice;
  };

  const totalPrice = calculateTotal().toFixed(2)

  // Handle delete image
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handlePaymentSubmit = async () => {
 
    console.log(selectedMethod, selectedImage);
    if (!selectedMethod || !selectedImage) {
      toast.info("Please select a payment method and upload a slip.");
      return;
    }

   
    try {
    setPaymentProcess(true)
      const imageData = await ImageHosting(selectedImage);
      console.log(imageData.url);
      const selectedPaymentMethod = paymentData?.data.find(method => method._id === selectedMethod) ;
      if (!selectedPaymentMethod) {
        toast.info("Selected payment method not found.");
        return;
      }
      const body = {
        payment : {
          method: selectedPaymentMethod.name,
          slip: imageData.url,
        },
        charge : Math.round(selectedPaymentMethod.charge  * (OrderDetailsData?.data?.price / 100)),
      }
      
      const res = await updateTransaction({ id: orderId, body }).unwrap();
      if (res.success) {
        toast.success('Transaction  successfully');
        router.push(`/review-page`)
      } else {
        toast.error('Transaction Failed');
      }
      setPaymentProcess(false)
    } catch (error) {
      console.error('Failed to update transaction:', error);
      toast.error('Transaction update failed');
      setPaymentProcess(false)
    }
  };
  const HandleDepositSubmit = async () => {
    if (selectedMethod !== 120 || selectedMethodName !== 'Deposit') {
      return;
    }
    try {
      setPaymentProcess(true)
        const res = await tryDeposit({orderId:orderId}).unwrap()
        if (res.success) {
          toast.success('Transaction  successfully');
          router.push(`/review-page`)
        } else {
          toast.error('Transaction Failed');
        }
        setPaymentProcess(false)
      } catch (error) {
        console.error('Failed to update transaction:', error);
        toast.error('Transaction update failed');
        setPaymentProcess(false)
      }
    
  }
  useEffect(() => {
    if (!orderId) {
      router.push('/cart');
    }
  }, [orderId, orderIsSuccess, router]);
  useEffect(() => {
    if (paymentData?.data?.length > 0) {
      setSelectedMethod(paymentData.data[0]._id);
      setSelectedMethodName(paymentData.data[0].name);
      setCharge(paymentData.data[0].charge)
    }
  }, [paymentData]);


   console.log("selected payment",selectedMethodName)
   const handlePaymentMethodChange = async(data)=>{
    setSelectedMethod(data?._id);
    setSelectedMethodName(data?.name);
    setCharge(data?.charge)
   }
  return (
    <div className=' container'>
      <div className=" min-h-screen pt-5">
        <div className="p-4 mb-6 bg-white rounded-md shadow-md border">
          <div className="flex items-center justify-between pb-4 border-b">
            <h1 className="text-2xl font-bold">Payment
            </h1>
            <p className="text-gray-600">{moment().format('ll')}
            </p>
          </div>
        </div>
        {/* Order Status */}
        <div className="bg-white p-6 rounded shadow-md mb-6 text-center border">
          <Image unoptimized src={cart} alt="Order Success" className='mx-auto' width={150} height={150} />
          <h2 className="text-2xl font-semibold mt-4">Order Placed Successfully</h2>
          <p className="text-gray-500">Please pay now to confirm your order.</p>
        </div>
        <div className="flex flex-col xl:flex-row relative gap-4">
          <div className=" xl:w-[55%] w-full">
            {
              isLoading ? <>
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
              </> : <div>
                {OrderDetailsData?.data?.products.map((product) => (
                  <div className='mb-4 bg-white w-full px-6 pb-4 border rounded-md shadow-md  ' key={product._id}>
                    <div className="pt-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-col sm:flex-row gap-4">
                          <div className='flex gap-4'>
                            <div className='sm:w-12 sm:h-12 w-full h-full  mb-1'>
                              <Image unoptimized src={product.productImage} alt="Product" width={100} height={64} className="object-cover w-full h-full" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold sm:text-md">Order ID: #{product.productId}</p>
                            <p className="text-sm pr-4">{product.productTitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                                  {product?.skus?.map((sku) => (
                                    <div className="" key={sku._id}>
                                      <div className="flex border-b flex-col sm:flex-row py-2 sm:items-center  justify-between gap-5">
                                        <div className="items-center gap-3 flex">
                                          <Image
                                            unoptimized
                                            src={sku.image}
                                            alt="SKU"
                                            width={40}
                                            height={40}
                                            className="object-cover sm:w-10"
                                          />
                                          <p className="text-sm">Sort by color: {sku.sku}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                          <p className="text-sm">
                                            {sku.quantity} * ৳{parseFloat(sku.price).toFixed(2)}
                                          </p>
                                          <p className="sm:hidden block">
                                            ৳{(sku.quantity * parseFloat(sku.price)).toFixed(2)}
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                          <p className="sm:block hidden">
                                            ৳{(sku.quantity * parseFloat(sku.price)).toFixed(2)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="flex flex-row justify-between gap-5 mt-3 text-sm">
                                    <p>Item Details</p>
                                    <p>
                                      {product?.skus?.reduce((acc, sku) => acc + sku.quantity, 0)}{" "}
                                      items
                                    </p>
                                    <p>
                                      Total : ৳
                                      {Math.round(
                                        product?.skus?.reduce(
                                          (acc, sku) => acc + sku.quantity * sku.price,
                                          0
                                        )
                                      )}
                                    </p>
                   </div>
                  </div>
                ))}
              </div>
            }
          </div>

          {/* Payment Details */}
          <div className="flex-1 border  sticky top-0 mb-6 w-full bg-white p-4 rounded shadow-md">
            {
              paymentLoading ? <UserPaymentSkeleton /> : <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {paymentData?.data?.map((method) => (
                  <label key={method._id} className="flex h-20 gap-2 border items-center justify-center space-y-2 p-2 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="form-radio h-5 w-5 text-blue-600"
                      checked={selectedMethod === method._id}
                      onChange={() => {handlePaymentMethodChange(method)}}
                    />
                    <Image unoptimized src={method.image} alt={`${method.name} Logo`} width={60} height={50} />
                    {/* {method.name} */}
                  </label>
                ))}
                {/* {
                 userData?.data?.deposit >= OrderDetailsData?.data?.price
                } */}
                 <label key={120} className="flex h-20 gap-2 border items-center justify-center space-y-2 p-2 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="form-radio h-5 w-5 text-blue-600"
                      checked={selectedMethod === 120}
                      disabled={userData?.data?.deposit >= OrderDetailsData?.data?.price ? false : true}
                      onChange={() => {handlePaymentMethodChange({_id: 120, name:"Deposit"})}}
                    />
                    ৳ {userData?.data?.deposit || 0}
                    {/* {method.name} */}
                  </label>
              </div>
            }

            {/* Conditionally render payment method details based on selectedMethod */}

                {
                  selectedMethod && <div className={`p-4 mt-4 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${selectedMethod == 120 ? "hidden" : ""}`}>
                  {paymentData?.data?.map((method) => {
                    if (method._id === selectedMethod) {
                      return (
                        <div key={method.id}>
                          {
                            method?.name == 'Bkash' ?<>
                             <div className="font-bold">Payment Method: {method.name}</div>
                            {method.accountType === "bank" ? (
                              <>
                                <div>Account Name: {method.accountName}</div>
                                <div>Account Number: {method.accountNo}</div>
                                <div>Branch: {method.branch}</div>
                              </>
                            ) : (
                              <>
                                <div>Personal Number: {method.personalNumber}</div>
                                <div>Agent Number: {method.agentNumber}</div>
                              </>
                            )}
                            <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/3Mm8QOiZn-w" 
    title="YouTube video player" 
    frameborder="0" 
    className="w-full mt-6"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen 
    >
  </iframe>
                            </>  :      <>
                            
                            <div className="font-bold">Payment Method: {method.name}</div>
                            {method.accountType === "bank" ? (
                              <>
                                <div>Account Name: {method.accountName}</div>
                                <div>Account Number: {method.accountNo}</div>
                                <div>Branch: {method.branch}</div>
                              </>
                            ) : (
                              <>
                                <div>Personal Number: {method.personalNumber}</div>
                                <div>Agent Number: {method.agentNumber}</div>
                              </>
                            )}
                            </>                  
                          }
  
                        </div>
                      );
                    }
                    return null;
                  })}
                </div> 
                }


            {/* File Upload */}
                          <div className={`flex flex-col items-center 
           border-dashed border-2 rounded p-3 mt-4 h-48 relative ${selectedMethod == 120 ? "hidden" : ""}`}>
              {selectedImage ? (
                <div
                  className="relative group h-full w-full flex items-center 
          "
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Image unoptimized  
                    width={160}
                    height={200}
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded preview"
                    className="object-contain h-full w-full rounded"
                  />
                  <button
                    onClick={handleDeleteImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <div>
                      <Image unoptimized src={payment} width={150} height={100} alt='payment' />
                    </div>
                    <div className="text-blue-500 cursor-pointer">Upload Payment Slip</div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
           <div className="mt-4">
              <label htmlFor="payment-amount" className="block text-sm font-medium mb-2">Payment Amount{charge > 0 && <span className="text-red-500 font-semibold"> + Charge {charge} %</span>}</label>
              <Input readOnly={true} id="payment-amount" type="text" value={Math.round(Number(OrderDetailsData?.data?.price) + Number(Math.round(charge  * (OrderDetailsData?.data?.price / 100))))} />
            </div>
            {
              selectedMethodName == 'Bkash' && <Link href={"https://shop.bkash.com/parcel-trade-internationalrm10/paymentlink/default-payment"} target='_blank'>
                <button className=" border-2 border-blue-500 hover:bg-gray-100 bg-white text-blue-500 p-2 rounded w-full inline font-semibold mt-4">Go for Bkash</button>
            </Link>
            }
            {/* Pay Button */}
            {
              selectedMethod == 120 ?  <button onClick={HandleDepositSubmit}    className="bg-blue-500 text-white p-2 rounded w-full mt-4 mb-4">
              {
                paymentProcess ? <span>Payment processing...</span> :<span>Complete Payment</span>
              }
               
              </button>:  <button onClick={handlePaymentSubmit} className="bg-blue-500 text-white p-2 rounded w-full mt-4 mb-4">
            {
              paymentProcess ? <span>Payment processing...</span> :<span>Complete Payment</span>
            }
             
            </button>
            }
           

            
          </div>
        </div>

      </div>
    </div>
  );
};

const PaymentpageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentPage />
  </Suspense>
);

export default PaymentpageWrapper;
