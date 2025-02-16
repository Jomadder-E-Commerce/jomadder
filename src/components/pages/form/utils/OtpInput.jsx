import React, { useState } from "react";

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    const isPasting = value.length > 1;

    // If user pastes the OTP
    if (isPasting) {
      const pastedOtp = value.slice(0, length).split("");
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedOtp[i] || "";
      }
      setOtp(newOtp);
      onChange(newOtp.join(""));
      return;
    }

    // If user types a single digit
    if (!/^\d*$/.test(value)) return;
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus the next input field
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace key
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handleChange(e.clipboardData.getData("Text"), 0)}
          className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
        />
      ))}
    </div>
  );
};

export default OTPInput;
