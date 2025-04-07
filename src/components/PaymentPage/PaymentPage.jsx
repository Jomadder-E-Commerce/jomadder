"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import cart from "@/assets/AllCategories/approved-delivery.png";
import { Suspense, useEffect, useState } from "react";
import { Vault, X } from "lucide-react";
import payment from "@/assets/payment/payment.png";
import CartProductSkeleton from "../all-skeleton/cartSkeleton/CartProductSkeleton";
import { useGetProductDetailsQuery } from "../Redux/services/checkout/checkoutAPi";
import { useGetpaymentQuery } from "../Redux/services/paymentMethods/paymentApi";
import UserPaymentSkeleton from "../all-skeleton/CategorySkeleton/UserPaymentSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateTransactionMutation } from "../Redux/services/transactionApi";
import { toast } from "react-toastify";
import { ImageHosting } from "../shared/Cloudinary/Cloudinary";
import Link from "next/link";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useGetVerifyQuery,
} from "../Redux/services/AuthenticationApi/AuthenticationApi";
import {
  useTryDepositMutation,
  useUseDepositMutation,
} from "../Redux/services/depositApi/depositApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordian";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const {
    data: OrderDetailsData,
    isLoading,
    isSuccess: orderIsSuccess,
  } = useGetProductDetailsQuery(orderId);
  const [tryDeposit, { isLoading: depositLoading, isSuccess: depositSuccess }] =
    useTryDepositMutation();
  const [updateTransaction, { isLoading: transactionLoading, isSuccess }] =
    useUpdateTransactionMutation();
  const {
    data: userData,
    isLoading: loadingUser,
    isError: getUserError,
    refetch,
  } = useGetVerifyQuery();
  console.log("user", OrderDetailsData?.data?.price);
  const router = useRouter();
  const { data: paymentData, isLoading: paymentLoading } = useGetpaymentQuery();
  const [charge, setCharge] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedMethodName, setSelectedMethodName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [paymentProcess, setPaymentProcess] = useState(false);
  const IsDipositUseable =
    userData?.data?.deposit >= OrderDetailsData?.data?.price;
  const [Hover, setHover] = useState(false);
  const [seletedPaymentInfo, setSeletedPaymentInfo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    OrderDetailsData?.data?.products.forEach((product) => {
      product.skus.forEach((sku) => {
        totalPrice += sku.quantity * parseFloat(sku.price);
      });
    });
    return totalPrice;
  };

  const totalPrice = calculateTotal().toFixed(2);

  // Handle delete image
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedMethod || !selectedImage) {
      toast.info("Please select a payment method and upload a slip.");
      return;
    }
    try {
      setPaymentProcess(true);
      const imageData = await ImageHosting(selectedImage);
      // const selectedPaymentMethod = paymentData?.data.find(
      //   (method) => method._id === selectedMethod
      // );
      if (!seletedPaymentInfo) {
        toast.info("Selected payment method not found.");
        return;
      }
      const body = {
        payment: {
          method: seletedPaymentInfo?.accountType,
          slip: imageData.url,
          paymentInfo: seletedPaymentInfo,
        },
        charge: Math.round(
          seletedPaymentInfo?.charge * (OrderDetailsData?.data?.price / 100)
        ),
      };

      const res = await updateTransaction({ id: orderId, body }).unwrap();
      if (res.success) {
        toast.success("Transaction  successfully");
        router.push(`/order-confirmation/${orderId}`);
      } else {
        toast.error("Transaction Failed");
      }
      setPaymentProcess(false);
    } catch (error) {
      console.error("Failed to update transaction:", error);
      toast.error("Transaction update failed");
      setPaymentProcess(false);
    }
  };
  const HandleDepositSubmit = async () => {
    if (selectedMethod !== 120 || selectedMethodName !== "Deposit") {
      return;
    }
    try {
      setPaymentProcess(true);
      const res = await tryDeposit({ orderId: orderId }).unwrap();
      if (res.success) {
        toast.success("Transaction  successfully");
        router.push(`/review-page`);
      } else {
        toast.error("Transaction Failed");
      }
      setPaymentProcess(false);
    } catch (error) {
      console.error("Failed to update transaction:", error);
      toast.error("Transaction update failed");
      setPaymentProcess(false);
    }
  };
  useEffect(() => {
    if (!orderId) {
      router.push("/cart");
    }
  }, [orderId, orderIsSuccess, router]);
  useEffect(() => {
    if (paymentData?.data?.length > 0) {
      setSelectedMethod(paymentData.data[0]._id);
      setSelectedMethodName(paymentData.data[0].name);
      setCharge(paymentData.data[0].charge);
      const { _id, image, createdAt, updatedAt, ...restOfData } =
        paymentData.data[0];
      setSeletedPaymentInfo({ ...restOfData });
    }
  }, [paymentData]);

  const handlePaymentMethodChange = async (data) => {
    setSelectedMethod(data?._id);
    setSelectedMethodName(data?.name);
    setCharge(data?.charge);
    const { _id, id, image, createdAt, updatedAt, bankList, ...restOfData } =
      data;
    setSeletedPaymentInfo({ ...restOfData });
  };

  return (
    <div className=" container">
      <div className=" min-h-screen pt-5">
        <div className="p-4 mb-6 bg-white rounded-md shadow-md border">
          <div className="flex items-center justify-between pb-4 border-b">
            <h1 className="text-2xl font-bold">Payment</h1>
            <p className="text-gray-600">{moment().format("ll")}</p>
          </div>
        </div>
        {/* Order Status */}
        {/* <div className="bg-white p-6 rounded shadow-md mb-6 text-center border">
          <Image unoptimized src={cart} alt="Order Success" className='mx-auto' width={150} height={150} />
          <h2 className="text-2xl font-semibold mt-4">Order Placed Successfully</h2>
          <p className="text-gray-500">Please pay now to confirm your order.</p>
        </div> */}
        <div className="flex flex-col xl:flex-row relative gap-4">
          <div className=" xl:w-[55%] w-full">
            {isLoading ? (
              <>
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
              </>
            ) : (
              <div>
                {OrderDetailsData?.data?.products.map((product) => (
                  <div
                    className="mb-4 bg-white w-full px-6 pb-4 border rounded-md shadow-md  "
                    key={product._id}
                  >
                    <div className="pt-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex  flex-row items-start gap-4">
                          <div className="flex gap-4 ">
                            <div className="w-16 h-16   mb-1">
                              <Image
                                unoptimized
                                src={product.productImage}
                                alt="Product"
                                width={100}
                                height={40}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold sm:text-md">
                              Order ID: #{product.productId}
                            </p>
                            <p className="text-sm pr-4">
                              {product.productTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {product?.skus?.map((sku) => (
                      <div className="" key={sku._id}>
                        <div className="flex border-b flex-col sm:flex-row py-2 sm:items-center  justify-between gap-5">
                          <div className="items-center gap-3 flex">
                            {sku?.image ? (
                              <Image
                                unoptimized
                                src={sku.image}
                                alt="SKU"
                                width={40}
                                height={40}
                                className="object-cover sm:w-10 bg-gray-400"
                              />
                            ) : (
                              <div className="sm:w-10 bg-gray-400 p-4"></div>
                            )}
                            <p className="text-sm">Sort by color: {sku.sku}</p>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="text-sm">
                              {sku.quantity} * ৳
                              {parseFloat(sku.price).toFixed(2)}
                            </p>
                            <p className="sm:hidden block">
                              ৳
                              {(sku.quantity * parseFloat(sku.price)).toFixed(
                                2
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <p className="sm:block hidden">
                              ৳
                              {(sku.quantity * parseFloat(sku.price)).toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-row justify-between gap-5 mt-3 text-sm">
                      <p>Item Details</p>
                      <p>
                        {product?.skus?.reduce(
                          (acc, sku) => acc + sku.quantity,
                          0
                        )}{" "}
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
            )}
          </div>

          {/* Payment Details */}
          <div className="flex-1 border  sticky top-0 mb-6 w-full bg-white p-4 rounded shadow-md">
            {paymentLoading ? (
              <UserPaymentSkeleton />
            ) : (
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
                {paymentData?.data?.map((method) => (
                  <label
                    key={method._id}
                    className="flex h-20 gap-2 border items-center justify-center space-y-2 p-2 rounded-lg cursor-pointer flex-col"
                  >
                    <span className="flex gap-2 items-center justify-center space-y-2 ">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="form-radio h-5 w-5 mt-2 text-blue-600"
                        checked={selectedMethod === method._id}
                        onChange={() => {
                          handlePaymentMethodChange(method);
                        }}
                      />
                      {method.image && method?.accountType != "bank" ? (
                        <Image
                          unoptimized
                          src={method.image}
                          alt={`${method.name} Logo`}
                          width={60}
                          height={50}
                        />
                      ) : (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="31"
                            viewBox="0 0 29 31"
                            fill="none"
                          >
                            <g id="Group 48096573">
                              <path
                                id="Vector"
                                d="M14.4963 0L0.783203 11.4786H28.2125L14.4963 0Z"
                                fill="#83C6EF"
                              />
                              <path
                                id="Vector_2"
                                d="M0.783203 11.4785H28.2093V13.1409H0.783203V11.4785Z"
                                fill="#1A7FC0"
                              />
                              <path
                                id="Vector_3"
                                d="M8.51087 15.3784H4.50978L3.88086 13.1377H9.13664L8.51087 15.3784ZM16.4973 15.3784H12.4962L11.8704 13.1377H17.1262L16.4973 15.3784ZM24.4236 15.3784H20.4225L19.7936 13.1377H25.0493L24.4236 15.3784Z"
                                fill="#83C6EF"
                              />
                              <path
                                id="Vector_4"
                                d="M5.04297 15.3784H7.96952V24.9482H5.04297V15.3784ZM13.0325 15.3784H15.9591V24.9482H13.0325V15.3784ZM20.9588 15.3784H23.8854V24.9482H20.9588V15.3784Z"
                                fill="#FECA20"
                              />
                              <path
                                id="Vector_5"
                                d="M4.49805 24.9517H8.51178V26.9901H4.49805V24.9517ZM12.4907 24.9517H16.5045V26.9901H12.4907V24.9517ZM20.4171 24.9517H24.4308V26.9901H20.4171V24.9517Z"
                                fill="#83C6EF"
                              />
                              <path
                                id="Vector_6"
                                d="M14.4961 0V11.4786H28.2123L14.4961 0Z"
                                fill="#429BCF"
                              />
                              <path
                                id="Vector_7"
                                d="M6.50977 15.3784H7.97304V24.9482H6.50977V15.3784ZM14.4961 15.3784H15.9594V24.9482H14.4961V15.3784ZM22.4225 15.3784H23.8857V24.9482H22.4225V15.3784Z"
                                fill="#E7B100"
                              />
                              <path
                                id="Vector_8"
                                d="M2.83789 26.1587H26.1586V27.8211H2.83789V26.1587Z"
                                fill="#2D416C"
                              />
                              <path
                                id="Vector_9"
                                d="M0 27.8213H29V30.1063H0V27.8213Z"
                                fill="#1A7FC0"
                              />
                            </g>
                          </svg>
                        </span>
                      )}
                    </span>
                    {method.name || "Bank"}
                  </label>
                ))}
                {/* {
                 userData?.data?.deposit >= OrderDetailsData?.data?.price
                } */}
                <label
                  key={120}
                  className="flex h-20 gap-2 border items-center justify-center space-y-2 p-2 rounded-lg cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="form-radio h-5 w-5 text-blue-600"
                    checked={selectedMethod === 120}
                    disabled={
                      userData?.data?.deposit >= OrderDetailsData?.data?.price
                        ? false
                        : true
                    }
                    onChange={() => {
                      handlePaymentMethodChange({ _id: 120, name: "Deposit" });
                    }}
                  />
                  ৳ {userData?.data?.deposit || 0}
                  {/* {method.name} */}
                </label>
              </div>
            )}

            {/* Conditionally render payment method details based on selectedMethod */}

            {selectedMethod && (
              <div
                className={`p-4 mt-4 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                  selectedMethod == 120 ? "hidden" : ""
                }`}
              >
                {paymentData?.data?.map((method) => {
                  if (method._id === selectedMethod) {
                    return (
                      <div
                        key={method.id}
                        className="sm:text-base xsm:text-sm text-[13px]"
                      >
                        <div className="font-bold">
                          Payment Method: {method.name}
                        </div>
                        {method.accountType === "bank" ? (
                          // <>
                          //   <div>Account Name: {method.accountName}</div>
                          //   <div>Account Number: {method.accountNo}</div>
                          //   <div>Branch: {method.branch}</div>
                          // </>
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full flex flex-col gap-4 mt-4 "
                                onValueChange={(value) => {
                                  handlePaymentMethodChange({
                                    ...method,
                                    ...value,
                                  });
                                }}
                              >
                                {method?.bankList?.map((bank, index) => (
                                  <AccordionItem
                                    key={index}
                                    value={bank}
                                    className="bg-card rounded-lg shadow-md w-full"
                                  >
                                    <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 rounded-t-lg w-full text-xl">
                                      {bank.bankName}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 py-2 bg-background rounded-b-lg">
                                      <div
                                        className={`p-4 mt-1 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                                          selectedMethod == 120 ? "hidden" : ""
                                        }`}
                                      >
                                        <p className="text-lg font-semibold text-black dark:text-white">
                                          Account Infomation:
                                        </p>
                                        <span className="text-base">
                                          <div>
                                            Account Name: {bank.accountName}
                                          </div>
                                          <div>
                                            Account Number: {bank.accountNo}
                                          </div>
                                          <div>Branch: {bank.branch}</div>
                                        </span>
                                      </div>
                                      <div
                                        className={`p-3 mt-4 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                                          selectedMethod == 120 ? "hidden" : ""
                                        }`}
                                      >
                                        <PayslipUpload
                                          charge={bank?.charge}
                                          OrderDetailsData={OrderDetailsData}
                                          selectedMethod={selectedMethod}
                                          selectedImage={selectedImage}
                                          setHover={setHover}
                                          handleDeleteImage={handleDeleteImage}
                                          handleFileChange={handleFileChange}
                                          payment={payment}
                                        >
                                          <div>
                                            <label
                                              htmlFor="referenceNo"
                                              className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                              Reference No:
                                            </label>
                                            <Input
                                              placeholder="Enter your reference code"
                                              name="referenceNo"
                                              id="referenceNo"
                                              key={"referenceNo"}
                                              required
                                              onChange={(e) =>
                                                setSeletedPaymentInfo(
                                                  (prev) => ({
                                                    ...prev,
                                                    referenceNo: e.target.value,
                                                  })
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="mt-2">
                                            <label
                                              htmlFor="depositDate"
                                              className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                              Deposit date:
                                            </label>
                                            <Input
                                              placeholder="Enter the deposit date"
                                              name="depositDate"
                                              type="date"
                                              id="depositDate"
                                              required
                                              onChange={(e) =>
                                                setSeletedPaymentInfo(
                                                  (prev) => ({
                                                    ...prev,
                                                    depositDate: e.target.value,
                                                  })
                                                )
                                              }
                                            />
                                          </div>
                                        </PayslipUpload>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <>
                            <div>Personal Number: {method.personalNumber}</div>
                            <div>Agent Number: {method.agentNumber}</div>
                          </>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            {selectedMethodName &&
              !["bank", "visa", "online"].includes(
                selectedMethodName?.toLowerCase()
              ) && (
                <div
                  className={`p-3 mt-4 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                    selectedMethod == 120 ? "hidden" : ""
                  }`}
                >
                  <PayslipUpload
                    charge={charge || 0}
                    OrderDetailsData={OrderDetailsData}
                    selectedMethod={selectedMethod}
                    selectedImage={selectedImage}
                    setHover={setHover}
                    handleDeleteImage={handleDeleteImage}
                    handleFileChange={handleFileChange}
                    payment={payment}
                  />
                </div>
              )}

            {selectedMethodName == "Bkash" && (
              <Link
                href={
                  "https://shop.bkash.com/parcel-trade-internationalrm10/paymentlink/default-payment"
                }
                target="_blank"
              >
                <button className=" border-2 border-blue-500 hover:bg-gray-100 bg-white text-blue-500 p-2 rounded w-full inline font-semibold mt-4">
                  Go for Bkash
                </button>
              </Link>
            )}
            {selectedMethodName == "Visa" && (
              <Link href={"https://sandbox.sslcommerz.com"} target="_blank">
                <button
                  disabled
                  className=" border-2 border-blue-500 hover:bg-gray-100 bg-white text-blue-500 p-2 rounded w-full inline font-semibold mt-4"
                >
                  Go for Sslcommerz
                </button>
              </Link>
            )}
            {/* Pay Button */}
            {selectedMethod == 120 ? (
              <button
                onClick={HandleDepositSubmit}
                className="bg-blue-500 text-white p-2 rounded w-full mt-4 mb-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={!selectedImage}
              >
                {paymentProcess ? (
                  <span>Payment processing...</span>
                ) : (
                  <span>Complete Payment</span>
                )}
              </button>
            ) : (
              <button
                onClick={handlePaymentSubmit}
                className="bg-blue-500 text-white p-2 rounded w-full mt-4 mb-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={
                  (seletedPaymentInfo?.accountType == "bank" &&
                    (!seletedPaymentInfo?.referenceNo ||
                      !seletedPaymentInfo?.depositDate ||
                      !selectedImage)) ||
                  (!seletedPaymentInfo?.accountType != "bank" && !selectedImage)
                }
              >
                {paymentProcess ? (
                  <span>Payment processing...</span>
                ) : (
                  <span>Complete Payment</span>
                )}
              </button>
            )}
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

export const PayslipUpload = ({
  charge = 0,
  OrderDetailsData,
  selectedMethod,
  selectedImage,
  setHover,
  handleDeleteImage,
  handleFileChange,
  payment,
  children,
}) => (
  <div>
    <div className="mt-2 flex items-center justify-between">
      <div className="block text-lg font-semibold mb-2">
        Payable
        {charge > 0 && (
          <span className="text-red-500 font-semibold">
            {" "}
            + Charge {charge} %
          </span>
        )}
      </div>
      <div className="block text-lg font-semibold mb-2">
        {Math.round(
          Number(OrderDetailsData?.data?.price) +
            Number(Math.round(charge * (OrderDetailsData?.data?.price / 100)))
        ) + " BDT"}
      </div>
      {/* <label
        htmlFor="payment-amount"
        className="block text-lg font-semibold mb-2"
      >
        Payable
        {charge > 0 && (
          <span className="text-red-500 font-semibold">
            {" "}
            + Charge {charge} %
          </span>
        )}
      </label>
      <Input
        readOnly={true}
        id="payment-amount"
        type="text"
        value={
          Math.round(
            Number(OrderDetailsData?.data?.price) +
              Number(Math.round(charge * (OrderDetailsData?.data?.price / 100)))
          ) + " BDT"
        }
        className="text-lg font-semibold"
      /> */}
    </div>

    {children}
    {/* File Upload */}
    <div
      className={`flex flex-col items-center
           border-dashed border-2 rounded p-3 mt-4 h-48 relative ${
             selectedMethod == 120 ? "hidden" : ""
           }`}
    >
      {selectedImage ? (
        <div
          className="relative group h-full w-full flex items-center
          "
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Image
            unoptimized
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
            <Image
              unoptimized
              src={payment}
              width={150}
              height={100}
              alt="payment"
            />
          </div>
          <div className="text-blue-500 cursor-pointer">
            Upload Payment Slip
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </>
      )}
    </div>
  </div>
);