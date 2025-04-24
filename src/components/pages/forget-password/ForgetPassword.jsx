"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { usePostForgetPasswordMutation } from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";
import { setLocalStorage } from "@/components/shared/LocalStorage/LocalStorage";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [PostForgetPassword,{isLoading}] = usePostForgetPasswordMutation()
  const OTP_DURATION = 300;
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    try{
      const res = await PostForgetPassword({email})
      // console.log(res);
      if(res.data){
        toast.success(`${res.data.message}`)
        router.replace("/request-reset")
        setLocalStorage("email",email)
        const expirationTime = Date.now() + OTP_DURATION * 1000;
        setLocalStorage("otp_expiration", expirationTime); 
      }else{
        toast.success(`${res.error.data.message}`)
        setEmail("")
      }
    }catch(err){
      console.log(err);
    }
  };



  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div>
            <form onSubmit={handleSubmit}>
              <label className="">Please enter reg. email or phone number </label>
              <Input
                type="email"
                className="mt-3"
                placeholder="Please enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button disable={isLoading}
                type="submit"
                className="px-6 mt-5 py-3 text-white rounded-tl-lg rounded-br-lg bg-blue-600"
              >
                {isLoading?"Sending..":"NEXT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
