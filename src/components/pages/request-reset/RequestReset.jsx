"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/components/shared/LocalStorage/LocalStorage";
import { useGetVerifyQuery, usePostForgetPasswordMutation, useVerifyCodeMutation } from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";

const RequestReset = () => {
  const [timerCount, setTimer] = useState(300); // Default 5 minutes
  const [otp, setOtp] = useState('');
  const [disable, setDisable] = useState(true);
  const [email, setEmail] = useState("");
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [PostForgetPassword, { isLoading: forgerLoading }] = usePostForgetPasswordMutation()
  const router = useRouter();
  const OTP_DURATION = 300; 
  useEffect(() => {
    const savedEmail = getLocalStorage("email");
    const expirationTime = getLocalStorage("otp_expiration");
    if (savedEmail) setEmail(savedEmail);
    if (expirationTime) {
      const currentTime = Date.now();
      const remainingTime = Math.floor((expirationTime - currentTime) / 1000);
      if (remainingTime > 0) {
        setTimer(remainingTime);
      } else {
        setDisable(false);
      }
    }
  }, [PostForgetPassword]);

  useEffect(() => {
    if (timerCount > 0) {
      const interval = setInterval(() => {
        setTimer((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount <= 0) {
            clearInterval(interval);
            setDisable(false); 
          }
          return newCount;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerCount]);

  const verifyOTP = async () => {
    const enteredOTP = otp.trim(); 
    if (enteredOTP.length === 0) {
      toast.error("Please enter the OTP."); 
      return; 
    } 
    if (enteredOTP.length !== 6) {
      toast.error("Please enter the 6-digit OTP."); 
      return; 
    } 

    try {
      const response = await verifyCode({ value : email, code: enteredOTP }).unwrap();
      if (response.data) {
        toast.success("OTP verified successfully!");
        setLocalStorage("tokens", response.data); 
        router.replace("/change-password");
        removeLocalStorage("otp_expiration")
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while verifying OTP. Please try again.");
    }
  };

  const resendOTP = async () => {
    if (disable) return;

    try {
      const res = await PostForgetPassword({ email });
      if (res.data) {
        toast.success("A new OTP has been sent to your email.");
        setDisable(true);
        const expirationTime = Date.now() + OTP_DURATION * 1000; 
        setLocalStorage("otp_expiration", expirationTime); 

        setTimer(OTP_DURATION); 
      } else {
        toast.error(res.error.data.message);
        setEmail(""); 
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-10">
                <div className="flex justify-center space-x-4">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="text-gray-400">-</span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="h-12 !w-12 text-lg text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={verifyOTP}
                      className="flex items-center justify-center w-full py-5 text-sm text-white bg-blue-700 rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify Account"}
                    </button>
                  </div>

                  <div className="flex items-center justify-center text-sm font-medium text-gray-500 space-x-1">
                    <p>Didn&apos;t receive the code?</p>
                    <button
                      onClick={resendOTP}
                      className="text-blue-600 underline"
                      disabled={disable || forgerLoading}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : (forgerLoading ? "Resending OTP..." : "Resend OTP")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestReset;
