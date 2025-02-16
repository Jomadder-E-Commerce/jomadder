"use client";

import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '../ui/input'; // Adjust the import based on your folder structure
import { ImageHosting } from '../shared/Cloudinary/Cloudinary'; // Adjust the import based on your folder structure
import { usePostPaymentMutation } from '../Redux/services/paymentMethods/paymentApi'; // Adjust the import based on your folder structure
import { toast } from 'react-toastify';

const AddPayment = () => {
  const [postPayment, { isLoading, isSuccess }] = usePostPaymentMutation();
  const [accountType, setAccountType] = useState('mobile banking');
  const [imageDeleted, setImageDeleted] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [BankimageDeleted, setBankImageDeleted] = useState(false);
  const [BankImage, setBankImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    if (accountType === 'mobile banking' && !newImage) {
      toast.error("Please select an image for mobile banking");
      return;
    }

    if (accountType === 'bank' && !BankImage) {
      toast.error("Please select an image for bank account");
      return;
    }
    const data =
      accountType === 'mobile banking'
        ? {
            accountType: 'mobile banking',
            personalNumber: formData.personalNumber,
            agentNumber: formData.agentNumber,
            name: formData.name,
          }
        : {
            accountType: 'bank',
            accountNo: Number(formData.accountNumber),
            accountName: formData.accountName,
            branch: formData.branch,
            name: formData.bankName,
          };

    // Upload image based on selected account type
    const imageResponse =
      accountType === 'mobile banking'
        ? newImage && (await ImageHosting(newImage))
        : BankImage && (await ImageHosting(BankImage));

    // Add the image URL if it exists
    if (imageResponse) {
      data.image = imageResponse.url;
    }

    try {
      const res = await postPayment(data);
      if (res?.data?.success) {
        toast.success("Payment submitted successfully");
        reset();
        setNewImage(false)
        setBankImage(false)
      } else {
        toast.error(`${res?.error?.data?.message}`);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  const handleImageDelete = () => {
    setImageDeleted(true);
    setNewImage(null);
  };

  const handleBankImageDelete = () => {
    setBankImageDeleted(true);
    setBankImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImageDeleted(false);
    }
  };

  const handleBankImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBankImage(file);
      setBankImageDeleted(false);
    }
  };

  return (
    <div className="w-full mt-7 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
      <div className="flex gap-4 mb-4 ">
        <div className="flex gap-2  items-center">
          <input
            type="radio"
            name="accountType"
            disabled={isLoading}
            value="mobile banking"
            checked={accountType === 'mobile banking'}
            onChange={() => setAccountType('mobile banking')}
            className="text-blue-600"
          />
         <p> Mobile Banking</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="accountType"
            disabled={isLoading}
            value="bank"
            checked={accountType === 'bank'}
            onChange={() => setAccountType('bank')}
            className="text-blue-600"
          />
         Bank
        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)}>
        {accountType === 'mobile banking' ? (
          <>
            <div>
              {!imageDeleted && newImage ? (
                <div className="relative group">
                  <Image unoptimized  
                    width={80}
                    height={80}
                    src={URL.createObjectURL(newImage)}
                    alt="Selected mobile banking image"
                    className="object-cover w-36 mx-auto"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
                    onClick={handleImageDelete}
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="image">Image</label>
              <Input
                name="image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageChange}
                className="mx-auto"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-gray-700 font-medium mb-2">Mobile Banking Name</label>
              <Input
                type="text"
                {...register("name", { required: "Mobile Banking Name is required" })}
                placeholder="Enter your mobile banking name"
              />
              {errors.name && <p className=" text-red-500 text-sm absolute">{errors.name.message}</p>}
            </div>

            <div className="mb-4 sm:flex gap-4">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Personal Number</label>
                <Input
                  type="text"
                  {...register("personalNumber", { required: "Personal Number is required" })}
                  placeholder="Enter your personal number"
                />
                {errors.personalNumber && <p className=" text-red-500 text-sm absolute">{errors.personalNumber.message}</p>}
              </div>
              <div className="w-full mt-4 sm:mt-0">
                <label className="block text-gray-700 font-medium mb-2">Agent Number</label>
                <Input
                  type="text"
                  {...register("agentNumber", { required: "Agent Number is required" })}
                  placeholder="Enter agent number"
                />
                {errors.agentNumber && <p className=" text-red-500 text-sm absolute">{errors.agentNumber.message}</p>}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              {!BankimageDeleted && BankImage ? (
                <div className="relative group">
                    <Image unoptimized  
                    width={80}
                    height={80}
                    src={URL.createObjectURL(BankImage)}
                    alt="Selected bank image"
                    className="object-cover w-36 mx-auto"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
                    onClick={handleBankImageDelete}
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="image">Image</label>
              <Input
                name="image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleBankImageChange}
                className="col-span-3"
              />
            </div>
            <div className="sm:flex gap-2 mb-4">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Banking Name</label>
                <Input
                  type="text"
                  {...register("bankName", { required: "Bank Name is required" })}
                  placeholder="Enter your banking name"
                />
                {errors.bankName && <p className=" text-red-500 text-sm absolute">{errors.bankName.message}</p>}
              </div>
              <div className="w-full mt-4 sm:mt-0">
                <label className="block text-gray-700 font-medium mb-2">Account Number</label>
                <Input
                  type="text"
                  {...register("accountNumber", { required: "Account Number is required" })}
                  placeholder="Enter your bank account number"
                />
                {errors.accountNumber && <p className=" text-red-500 text-sm absolute">{errors.accountNumber.message}</p>}
              </div>
            </div>
            <div className="sm:flex gap-4 mb-4">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Account Name</label>
                <Input
                  type="text"
                  {...register("accountName", { required: "Account Name is required" })}
                  placeholder="Enter account holder name"
                />
                {errors.accountName && <p className=" text-red-500 text-sm absolute">{errors.accountName.message}</p>}
              </div>
              <div className="w-full mt-4 sm:mt-0">
                <label className="block text-gray-700 font-medium mb-2">Branch</label>
                <Input
                  type="text"
                  {...register("branch", { required: "Branch is required" })}
                  placeholder="Enter branch name"
                />
                {errors.branch && <p className=" text-red-500 text-sm absolute">{errors.branch.message}</p>}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
        >
          {isLoading ? 'Submitting...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

export default AddPayment;
