"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

// Assets
import GoogleLogo from "@/assets/logo/google.png";
import FacebookLogo from "@/assets/logo/facebook.png";
import Logo from "/src/assets/logo/logo.png";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Helpers
import {
  formatPhoneNumber,
  isEmail,
  isPhoneNumber,
} from "@/utils/emailPhoneChecker";
import {
  getLocalStorage,
  removeLocalStorage,
  setCookie,
  setLocalStorage,
} from "@/components/shared/LocalStorage/LocalStorage";
import { handleGoogleLogin, handleFacebookLogin } from "./formSubmitHandler";
import { preset_api_v1 } from "@/app/control_version_api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/components/Redux/features/AllSlice/authSlice";

const LoginForm = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API + preset_api_v1;
  const router = useRouter();
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.input.value.trim();
    const password = form.password.value;

    // Validate the input
    const validEmail = isEmail(inputValue);
    const validPhone = isPhoneNumber(inputValue);

    if (!validEmail && !validPhone) {
      toast.error("Please enter a valid email address or phone number.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = { password };

      if (validEmail) {
        payload.email = inputValue;
        payload.loginBy = "Email";
      } else if (validPhone) {
        payload.phone = formatPhoneNumber(inputValue);
        payload.loginBy = "Phone";
      }

      const response = await axios.post(`${baseApi}/auth/signin`, payload);
      const data = response.data?.data;
      if (!data) {
        throw new Error("No data returned from API");
      }

      dispatch(setCredentials({
        user: data,
        token: data.accessToken,
        refreshtoken: data.refreshtoken
      }));

      // Save tokens and user information
      setLocalStorage("user", data);
      setCookie(data.refreshToken);
      setLocalStorage("token", data.accessToken);

      // Retrieve and then clear redirect path (if any)
      let redirectPath = getLocalStorage("redirect") || "/";
      redirectPath = redirectPath.replace(/^"(.*)"$/, '$1');
      removeLocalStorage("redirect");


      toast.success("Login successful");

      router.replace(redirectPath);

    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const { token, user } = await handleGoogleLogin();
      const response = await axios.post(`${baseApi}/auth/signin`, {
        email: user.email,
        token,
        loginBy: "Google",
      });
      const data = response.data?.data;
      if (!data) {
        throw new Error("No data returned from API");
      }

      setLocalStorage("user", data);
      setCookie(data.refreshToken);
      setLocalStorage("token", data.accessToken);
      const redirectPath = getLocalStorage("redirectPath") || "/";
      removeLocalStorage("redirectPath");
      toast.success("Login successful");
      router.push(redirectPath);
    } catch (error) {
      console.error(error);
      toast.error("Account not found! Please register first.");
    }
  };

  const handleFacebook = async () => {
    try {
      const { token, user } = await handleFacebookLogin();
      const response = await axios.post(`${baseApi}/auth/signin`, {
        email: user.email,
        token,
        loginBy: "Facebook",
      });
      const data = response.data?.data;
      if (!data) {
        throw new Error("No data returned from API");
      }

      setLocalStorage("user", data);
      setCookie(data.refreshToken);
      setLocalStorage("token", data.accessToken);
      const redirectPath = getLocalStorage("redirectPath") || "/";
      removeLocalStorage("redirectPath");
      toast.success("Login successful");
      router.push(redirectPath);
    } catch (error) {
      console.error(error);
      toast.error("Account not found! Please register first.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-5 md:px-5 bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="md:rounded-xl overflow-hidden w-full md:w-[600px]">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full rounded-md bg-gray-50">
                <div className="p-6 space-y-6 sm:p-8">
                  {/* <div> */}
                  <Link href="/" className="flex items-center justify-center gap-1">
                    <Image
                      alt="Jomadder logo"
                      src={Logo}
                      height={40}
                      width={40}
                    />
                    <p className="text-xl font-bold leading-tight tracking-tight text-center text-gray-700 md:text-3xl">
                      Jomadder
                    </p>
                  </Link>
                  {/* </div> */}
                  <div className="text-center">
                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                      Sign In
                    </p>
                    <p className="mt-2 text-gray-400">
                      Welcome back! Log in to your account
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <Button
                      onClick={handleGoogle}
                      variant="outline"
                      className="flex items-center justify-center w-full space-x-2 bg-white"
                    >
                      <Image
                        src={GoogleLogo}
                        alt="Google logo"
                        className="w-5 h-5"
                      />
                      <span>Sign in with Google</span>
                    </Button>
                    {/* <Button
                      onClick={handleFacebook}
                      variant="outline"
                      className="flex items-center justify-center w-full space-x-2"
                    >
                      <Image
                        src={FacebookLogo}
                        alt="Facebook logo"
                        className="w-5 h-5"
                      />
                      <span>Sign in with Facebook</span>
                    </Button> */}
                  </div>
                  <p className="text-center">or</p>
                  <form onSubmit={handleLogin}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Email Address or Phone Number
                      </label>
                      <Input
                        placeholder="Enter your email or phone number"
                        name="input"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                      </label>
                      <Input
                        name="password"
                        required
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                      />
                      <div
                        className="absolute right-0 flex items-center pr-3 cursor-pointer  top-[50px] transform -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-500" />
                        ) : (
                          <FaEye className="text-gray-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      <Link
                        href="/forget-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 text-white rounded-md bg-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                  </form>
                  <p className="flex items-center justify-between w-full text-sm sm:text-base">
                    <span className="text-slate-700">
                      Don’t have an account?
                    </span>
                    <Link
                      href="/register"
                      className="ml-1 text-primary hover:underline"
                    >
                      Register
                    </Link>
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

export default LoginForm;