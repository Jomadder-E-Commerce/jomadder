'use client'
import React, { useState } from "react";
import { usePostRegisterMutation } from "@/components/Redux/services/AuthenticationApi/AuthenticationApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { validationSchemaResistor } from "@/components/shared/Validation/AuthValidation";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Google from '@/assets/logo/google.png';
import Facebook from '@/assets/logo/facebook.png';
import logo from "/src/assets/logo/logo.png";
import Image from "next/image";
import { isEmail, isPhoneNumber } from "@/utils/emailPhoneChecker";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmSignUp from "./ConfirmSignUp";
import InputEmailPhone from "./InputEmailPhone";
import OtpPage from "./OtpPage";
import { handleGoogleLogin } from "./formSubmitHandler";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { preset_api_v1 } from "@/app/control_version_api";
import { getLocalStorage, removeLocalStorage, setCookie, setLocalStorage } from "@/components/shared/LocalStorage/LocalStorage";

const RegisterForm = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API + preset_api_v1;
  const [page, setPage] = useState(1) 
  const router = useRouter()
  const [form, setForm] = useState({})	

  const handleGoogle = async () => {
    const {token,user} = await handleGoogleLogin()
    try {
      const response = await axios.post(`${baseApi}/auth/signin`, { email: user.email, token, loginBy: "Google" })
      if (response.data.success) {
        toast.success("Account created successfully")
        setLocalStorage("user", response.data?.data);
        setCookie(response.data?.data?.refreshToken);
        setLocalStorage("token", response.data?.data?.accessToken);
        let redirectPath = getLocalStorage("redirect") || "/";
        redirectPath = redirectPath.replace(/^"(.*)"$/, '$1');
        removeLocalStorage("redirect");
        console.log(redirectPath)
        router.push(redirectPath);
      }
       
            
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  console.log(form)
  
  return (
    <div className="flex items-center justify-center min-h-screen py-5  md:px-5  bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="md:rounded-xl overflow-hidden w-full md:w-[600px]">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full bg-white rounded-md">
                <div className="p-6 space-y-4 sm:p-8">
                  <div className="flex items-center justify-center gap-1">
                    <Link href={"/"}>
                      <Image alt="" src={logo} height={40} width={40} /></Link>
                    {/* <Image alt="" src={logo} height={40} width={40} /> */}
                    <p className="text-xl font-bold leading-tight text-center tracking-tight text-gray-700 md:text-3xl">
                      Jomadder
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                      Sign Up
                    </p>
                    <p className="text-gray-400 mt-2">
                      Welcome! Sign Up to create your account
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button
                      onClick={handleGoogle}
                      variant="outline"
                      className="w-full bg-white flex items-center justify-center space-x-2"
                    >
                      <Image src={Google} alt="" className="w-5 h-5" />
                      <span>Sign Up with Google</span>
                    </Button>
                    {/* <Button
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <Image src={Facebook} alt="" className="w-5 h-5" />
                      <span>Sign Up with Facebook</span>
                    </Button> */}
                  </div>
                  {/* Email or phone  */}
                  <p className="text-center">or</p>

                  {page === 1 && <InputEmailPhone baseApi={baseApi} setPage={setPage} setForm={setForm}/>}
                  {page === 2 && <OtpPage baseApi={baseApi} setPage={setPage} form={form} setForm={setForm}/>}
                  {page === 3 && <ConfirmSignUp baseApi={baseApi} form={form}/>}

                  <p className="flex justify-between items-center">
                    <span className="text-slate-700">Have an account?</span>
                    <a className="text-primary hover:underline" href="/login">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;