"use client";
import { useChangePasswordMutation } from '@/components/Redux/services/AuthenticationApi/AuthenticationApi';
import { getLocalStorage, removeLocalStorage } from '@/components/shared/LocalStorage/LocalStorage';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaChangePassword } from '@/components/shared/Validation/AuthValidation';
const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const router = useRouter();
    const [email, setEmail] = useState('');

    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchemaChangePassword),
    });

    useEffect(() => {
        const emails = getLocalStorage("email");
        setEmail(emails);
    }, []);

    // Handle form submission
    const onSubmit = async (data) => {
        const payload = {
           value : email,
            newPassword: data.password, // Use password from form data
        };
        console.log(payload);

        const res = await changePassword(payload);
        if (res.data) {
            toast.success("Password changed successfully!");
            router.replace("/login");
            removeLocalStorage("email");
            reset(); // Reset form fields after successful submission
        } else {
            toast.error("Password change failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="max-w-[400px] ">
                                    <div className="space-y-4 md:space-y-4">
                                        <div className='w-full'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Your Email
                                            </label>
                                            <Input
                                                placeholder="Enter your email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                required
                                                name="email"
                                                type="email"
                                                defaultValue={email}
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                New Password
                                            </label>
                                            <Input
                                                placeholder="Enter your new password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('password')}
                                            />
                                            {errors.password && <p className="text-red-500 text-sm absolute">{errors.password.message}</p>}
                                            <div
                                                className="absolute right-0 bottom-4 flex items-center pr-3 cursor-pointer"
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
                                                placeholder="Confirm your new password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                {...register('confirmPassword')}
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-sm absolute">{errors.confirmPassword.message}</p>}
                                            <div
                                                className="absolute right-0 bottom-4 flex items-center pr-3 cursor-pointer"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <FaEyeSlash className="text-gray-500" />
                                                ) : (
                                                    <FaEye className="text-gray-500" />
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="px-6 mt-5 py-3 text-white rounded-tl-lg rounded-br-lg bg-blue-600"
                                            >
                                                {isLoading ? "Changing Password..." : "Change Password"}
                                            </button>
                                        </div>
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

export default ChangePassword;
