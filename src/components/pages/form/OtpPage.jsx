import React, { useState } from "react";
import OtpInput from "./utils/OtpInput";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";

const OtpPage = ({ baseApi, setPage, form,setForm }) => {
    const [otpValue, setOtpValue] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [timer, setTimer] = useState(300);

    React.useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer(prev => prev - 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendOTP = async () => {
        setTimer(300);
        if (form.loginBy === "Email") {
            const response = await axios.post(`${baseApi}/auth/verify/email`, { email: form?.email })
            const data = response.data
            if (data.success) {
                toast.success("OTP sent successfully to your email!")
            }
            return
        }
        if (form.loginBy === "Phone") {
            const response = await axios.post(`${baseApi}/auth/verify/number`, { phone: form?.phone })
            const data = response.data
            if (data.success) {
                toast.success("OTP sent successfully to your phone number!")
            }
        }
    };

    const handleOtpChange = async (otp) => {
        setOtpValue(otp);
    }

    const handleOtpSubmit = async () => {
        console.log(otpValue)
        setIsLoading(true)
        const value = form.loginBy === "Email" ? form?.email : form?.phone
        try {
            const response = await axios.post(`${baseApi}/auth/verify/code`, { code:otpValue, value })
            const data = response.data
            console.log(data)
            if (data.success) {
                toast.success("OTP verified successfully!")
                setForm({token:data.data,...form})
                setPage(3)
            }
        } catch (error) {
            console.log(error)
            setError("OTP is incorrect!")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 max-w-xs mx-auto">
            <h1 className="text-md font-semibold ">Enter OTP <span className="text-xs text-red-500">{"(Don't refresh the page)"}</span></h1>
            <div className="flex flex-col items-start justify-center gap-1">
                <OtpInput length={6} onChange={handleOtpChange} />
                <button  onClick={handleResendOTP} className="text-sm text-gray-500">{timer > 0 ? formatTime(timer) : "Resend OTP"}</button>
            </div>

            <Button disabled={isLoading} onClick={handleOtpSubmit} className="w-full"> {isLoading ? "Verifying OTP..." : "Verify OTP"}</Button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default OtpPage;
