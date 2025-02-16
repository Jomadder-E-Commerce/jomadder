"use client"

import { Input } from "@/components/ui/input";
import { formatPhoneNumber, isEmail, isPhoneNumber } from "@/utils/emailPhoneChecker";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const InputEmailPhone = ({ baseApi, setPage, setForm }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("Email");
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            let isValid = false;
            let payload = {};

            if (selectedMethod === "Email") {
                isValid = isEmail(inputValue);
                if (!isValid) {
                    toast.error("Please enter a valid email address");
                    return;
                }
                payload = { email: inputValue };
            } else {
                const formattedPhone = formatPhoneNumber(inputValue);
                isValid = isPhoneNumber(formattedPhone);
                if (!isValid) {
                    toast.error("Please enter a valid phone number");
                    return;
                }
                payload = { phone: formattedPhone };
            }

            setForm({ ...payload, loginBy: selectedMethod });
            
            const endpoint = selectedMethod === "Email" 
                ? `${baseApi}/auth/verify/email`
                : `${baseApi}/auth/verify/number`;

            const response = await axios.post(endpoint, payload);
            
            if (response.data.success) {
                toast.success(`OTP sent successfully to your ${selectedMethod === "Email" ? "email" : "phone number"}!`);
                setPage(2);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => setSelectedMethod("Email")}
                    className={`px-4 py-2 rounded-md ${
                        selectedMethod === "Email" 
                        ? "bg-primary text-white" 
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                    Email
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedMethod("Phone")}
                    className={`px-4 py-2 rounded-md ${
                        selectedMethod === "Phone" 
                        ? "bg-primary text-white" 
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                    Phone
                </button>
            </div> */}

            <div className="flex flex-col gap-2">
                <label className=" mb-2 text-sm font-medium text-gray-900 flex  gap-3 items-center ">

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="method"
                            value="Email"
                            checked={selectedMethod === "Email"}
                            onChange={() => setSelectedMethod("Email")}
                            className="mr-2"
                        />
                        Email
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="method"
                            value="Phone"
                            checked={selectedMethod === "Phone"}
                            onChange={() => setSelectedMethod("Phone")}
                            className="mr-2"
                        />
                        Phone
                    </div>
                </label>
                <Input
                    placeholder={
                        selectedMethod === "Email" 
                        ? "example@email.com" 
                        : "01XXX-XXXXXX"
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type={selectedMethod === "Email" ? "email" : "tel"}
                />
            </div>

            <button
                type="submit"
                className="py-3 text-white rounded-md w-full bg-primary disabled:bg-gray-400"
                disabled={isLoading || !inputValue}
            >
                {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
        </form>
    );
};

export default InputEmailPhone;