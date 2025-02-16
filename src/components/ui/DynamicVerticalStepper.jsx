import { cn } from "@/lib/utils";
import moment from "moment";
import React, { useState } from "react";

// const steps = [
//     {
//         date: "2024-12-01",
//         description: "Order Was Placed(ID#125425)"
//     },
//     {
//         date: "2024-12-02",
//         description: "Pick UP(ID#125425)"
//     },
//     {
//         date: "2024-12-02",
//         description: "Disburse to Courier(ID#125425)"
//     },
//     {
//         date: "2024-12-02",
//         description: "Order Deliver to Courier(ID#125425)"
//     }
// ];


function DynamicVerticalStepper({steps}) {
    const [currentStep, setCurrentStep] = useState(3);


    return (
        <div className="sm:max-w-md  max-w-full  mx-auto flex flex-col justify-center">
            <h1 className="text-2xl font-semibold text-slate-700 mb-5 text-center">Order Tracking</h1>
            {/* Stepper */}
            <div className="flex flex-col gap-10 mx-auto justify-center">
                {steps?.map((step, index) => (
                    <div
                        key={index}
                        className={`flex items-center sm:gap-x-4 gap-x-2 ${index === (steps.length -1) ? "opacity-100" : "opacity-50"
                            }`}
                    >
                        {/* Date Section */}
                        <p className="pr-1 text-right text-gray-500 whitespace-nowrap sm:text-base text-sm">{moment(step.date).format('L')}</p>


                        {/* Step Circle and Content */}
                        <div className="flex items-center space-x-4">
                            {/* Circle */}
                            <div
                                className={`flex relative items-center justify-center w-7 h-7 rounded-full text-white bg-blue-500`}
                            >
                                {/* {index} */}
                                <div className={cn(`w-0.5 absolute -translate-x-1/2 left-1/2 bottom-full h-10 bg-blue-300 `, { 'hidden': index === 0 })}></div>
                            </div>
                            {/* Step Content */}

                            <p className="text-gray-600 whitespace-nowrap sm:text-base text-sm">{step?.status?.toUpperCase()}</p>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default DynamicVerticalStepper;
