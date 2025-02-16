"use client"

import { getLocalStorage, removeLocalStorage, setCookie, setLocalStorage } from '@/components/shared/LocalStorage/LocalStorage';
import { Input } from '@/components/ui/input';
import { formatPhoneNumber } from '@/utils/emailPhoneChecker';
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ConfirmSignUp = ({baseApi,form}) => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const input = form.loginBy === "Email" ? form.email : form.phone;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
    
        if (password !== confirmPassword) return toast.error("Password and Confirm Password do not match");
        setIsLoading(true);
        
        try {
            const payload = form.loginBy === "Email" 
                ? { email: input, password, loginBy: "Email", token: form.token }
                : { phone: formatPhoneNumber(input), password, loginBy: "Phone", token: form.token };
    
            const response = await axios.post(`${baseApi}/auth/signup`, payload);
            const data = response.data;
    
            if (data.success) {
                // Auto-login logic
                setLocalStorage("user", data.data);
                setCookie(data.data.refreshToken);
                setLocalStorage("token", data.data.accessToken);
                removeLocalStorage("redirectPath");
                
                toast.success("Registration successful");
                const redirectPath = getLocalStorage("redirectPath") || "/";
                router.push(redirectPath); // Redirect to home/dashboard
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Your {form.loginBy === "Email" ? "Email" : "Phone Number"}
                    </label>
                    <Input
                        placeholder={form.loginBy === "Email" ? "Enter your email" : "Enter your phone number"}
                        value={form.loginBy === "Email" ? form.email : form.phone}
                        disabled
                    />
                </div>
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <Input
                        name="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        required
                    />
                    <div
                        className="absolute right-0 flex items-center pr-3 cursor-pointer inset-y-12"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <FaEyeSlash className="text-gray-500" />
                        ) : (
                            <FaEye className="text-gray-500" />
                        )}
                    </div>
                </div>
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Confirm Password
                    </label>
                    <Input
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                    />
                    <div
                        className="absolute right-0 flex items-center pr-3 cursor-pointer inset-y-12"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash className="text-gray-500" />
                        ) : (
                            <FaEye className="text-gray-500" />
                        )}
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="py-3 text-white rounded-md w-full bg-primary"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing Up..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default ConfirmSignUp;