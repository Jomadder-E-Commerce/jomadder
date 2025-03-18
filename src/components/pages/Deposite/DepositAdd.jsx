"use client";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react"; // Added useCallback
import { ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import payment from "@/assets/banner/upload.svg";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import UserPaymentSkeleton from "@/components/all-skeleton/CategorySkeleton/UserPaymentSkeleton";
import { useGetpaymentQuery } from "@/components/Redux/services/paymentMethods/paymentApi";
import { ImageHosting } from "@/components/shared/Cloudinary/Cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePostdepositeMutation } from "@/components/Redux/services/depositApi/depositApi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const steps = [
  { id: 1, title: "Select Payment Method" },
  { id: 2, title: "Enter Amount" },
  { id: 3, title: "Upload Slip" },
  { id: 4, title: "Confirm Details" },
];

const DepositAdd = () => {
  const router = useRouter();
  const { data: paymentData, isLoading: paymentLoading } = useGetpaymentQuery();
  const [selectedMethodName, setSelectedMethodName] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCharge,setSelectedCharge] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [postdeposite, { isLoading }] = usePostdepositeMutation();
  const [posting,setPosting] = useState(false);
  const submitButtonRef = useRef(null); // Add ref for button

  // Set the default payment method if available
  useEffect(() => {
    if (paymentData?.data?.length > 0) {
      setSelectedMethod(paymentData.data[0]._id);
      setSelectedMethodName(paymentData.data[0].name);
    }
  }, [paymentData]);

  // Validate file type and size before accepting it
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      // Optional: Check file size (e.g., limit to 5MB)
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > 5) {
        toast.error("Image size should not exceed 5MB.");
        return;
      }
      setSelectedImage(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  // Submit the deposit only after revalidating required fields
  const handlePaymentSubmit = useCallback(async () => {
    if (posting) return; // Prevent multiple submissions
    
    setPosting(true);
    
    try {
      // Validation checks
      if (!selectedImage || !paymentAmount) {
        toast.info("Please complete all required fields.");
        return;
      }
      
      const amount = Number(paymentAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid deposit amount.");
        return;
      }

      // Calculate total amount with charge
      const chargeAmount = (amount * selectedCharge) / 100;
      const totalAmount = amount + chargeAmount;

      // Upload image and submit
      const imageData = await ImageHosting(selectedImage);
      const selectedPaymentMethod = paymentData?.data.find(
        (method) => method._id === selectedMethod
      );

      if (!selectedPaymentMethod) {
        toast.info("Selected payment method not found.");
        return;
      }

      const requestBody = {
        methodId: selectedMethod,
        amount: totalAmount, // Send calculated total amount
        slip: imageData.url,
      };

      const response = await postdeposite(requestBody).unwrap();
      
      // Reset state
      setIsOpen(false);
      setCurrentStep(1);
      setPaymentAmount("");
      setSelectedMethod(null);
      setSelectedMethodName(null);
      setSelectedImage(null);
      
      toast.success("Payment submitted successfully");
    } catch (error) {
      console.error("Failed to submit payment:", error);
      toast.error(error.data?.message || "Payment submission failed");
    } finally {
      setPosting(false); // Ensure posting state is reset
    }
  }, [posting, selectedImage, paymentAmount, selectedMethod, paymentData, selectedCharge, postdeposite]);

  useEffect(() => {
    const button = submitButtonRef.current;
    if (!button) return;

    const handleClick = (e) => {
      if (posting) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, [posting]);
  // Validate inputs on every step transition
  const nextStep = () => {
    if (currentStep === 1) {
      // Step 1: Ensure a payment method is selected.
      if (!selectedMethod) {
        toast.error("Please select a payment method.");
        return;
      }
    }
    if (currentStep === 2) {
      // Step 2: Validate the deposit amount.
      if (!paymentAmount) {
        toast.error("Please enter the deposit amount.");
        return;
      }
      if (isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
        toast.error("Please enter a valid amount greater than 0.");
        return;
      }
    }
    if (currentStep === 3) {
      // Step 3: Ensure an image is uploaded.
      if (!selectedImage) {
        toast.error("You must upload an image before proceeding.");
        return;
      }
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render content based on the current step.
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {paymentLoading ? (
                <UserPaymentSkeleton />
              ) : (
                <RadioGroup
                  value={selectedMethod}
                  onValueChange={(value) => {
                    setSelectedMethod(value);
                    setSelectedMethodName(
                      paymentData?.data?.find((method) => method._id === value)
                        ?.name
                    );
                    setSelectedCharge(
                      paymentData?.data?.find((method) => method._id === value)
                        ?.charge 
                    );
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  {paymentData?.data?.map((method) => (
                    <div key={method._id}>
                      <RadioGroupItem
                        value={method._id}
                        id={`modal-${method._id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`modal-${method._id}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Image
                          unoptimized
                          src={method.image}
                          alt={`${method.name} Logo`}
                          width={60}
                          height={50}
                        />
                        <span className="mt-2">{method.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
            {selectedMethod && (
              <div className="p-4 rounded-lg bg-muted">
                {paymentData?.data?.map((method) => {
                  if (method._id === selectedMethod) {
                    return (
                      <div key={method._id} className="space-y-2">
                        <h3 className="font-semibold">{method.name} Details</h3>
                        {method.accountType === "bank" ? (
                          <>
                            <p>Account Name: {method.accountName}</p>
                            <p>Account Number: {method.accountNo}</p>
                            <p>Branch: {method.branch}</p>
                          </>
                        ) : (
                          <>
                            <p>Personal Number: {method.personalNumber}</p>
                            <p>Agent Number: {method.agentNumber}</p>
                          </>

                        )}
                        {
                          method?.charge ? <p>Charge: {method.charge} %</p> : "" 
                        }
                         
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        );
        case 2:
          const calculatedCharge = Number(paymentAmount || 0) * (selectedCharge / 100);
          const totalWithCharge = Number(paymentAmount || 0) + calculatedCharge;
        
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-payment-amount">
                  Enter Amount {selectedCharge > 0 && 
                    <span className="text-red-600">
                      ({selectedCharge}% charge applicable)
                    </span>
                  }
                </Label>
                
                <Input
                  id="modal-payment-amount"
                  type="number"
                  placeholder="Enter deposit amount"
                  value={paymentAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value)) setPaymentAmount(value);
                  }}
                />
        
                {selectedCharge > 0 && (
                  <div className="p-3 mt-2 rounded-lg bg-muted">
                    <p className="text-sm">
                      <span className="font-medium">Charge Calculation:</span><br />
                      - Base Amount: ৳{Number(paymentAmount || 0).toFixed(2)}<br />
                      - Service Charge ({selectedCharge}%): ৳{calculatedCharge.toFixed(2)}<br />
                      <span className="font-semibold">
                        Total Payable: ৳{totalWithCharge.toFixed(2)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        
        // Update the case 3 (Upload Slip Step)
      case 3:
        const finalCharge = (Number(paymentAmount || 0) * (selectedCharge / 100));
        const finalTotal = Number(paymentAmount || 0) + finalCharge;
      
        return (
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Base Amount:</div>
                <div className="text-right">৳{Number(paymentAmount).toFixed(2)}</div>
                
                {selectedCharge > 0 && (
                  <>
                    <div>Service Charge ({selectedCharge}%):</div>
                    <div className="text-right">৳{finalCharge.toFixed(2)}</div>
                  </>
                )}
                
                <div className="col-span-2 border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total Payable:</span>
                    <span>৳{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Label>Upload Payment Slip</Label>
            {/* <Label htmlFor="modal-payment-amount">Paybel Amount: {((paymentAmount / 100 ) + selectedCharge) * 100}</Label> */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="modal-dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="Uploaded preview"
                      layout="fill"
                      objectFit="contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleDeleteImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="modal-dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
            {selectedMethodName === "Bkash" && (
              <Link
                href={
                  "https://shop.bkash.com/parcel-trade-internationalrm10/paymentlink/default-payment"
                }
                target="_blank"
              >
                <button className="border-2 border-blue-500 hover:bg-gray-100 bg-white text-blue-500 p-2 rounded w-full inline font-semibold mt-4">
                  Go for Bkash
                </button>
              </Link>
            )}
          </div>
        );
      case 4:
        const confirmCharge = (Number(paymentAmount) * (selectedCharge / 100));
        const confirmTotal = Number(paymentAmount) + confirmCharge;
      
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold mb-4">Confirm Your Deposit</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Method:</span> {selectedMethodName}</p>
                <p><span className="font-medium">Base Amount:</span> ৳{Number(paymentAmount).toFixed(2)}</p>
                {selectedCharge > 0 && (
                  <p><span className="font-medium">Service Charge:</span> {selectedCharge}% (৳{confirmCharge.toFixed(2)})</p>
                )}
                <p className="font-bold">
                  <span className="font-medium">Total Amount:</span> ৳{confirmTotal.toFixed(2)}
                </p>
                <p><span className="font-medium">Payment Slip:</span> {selectedImage ? "Uploaded" : "Missing"}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" ">
      <Card className="w-full sm:max-w-[200px] max-w-full ">
        <CardContent>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full flex gap-2">
                Create Deposit <FaPlus />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  Deposit Funds - Step {currentStep}
                </DialogTitle>
                <DialogDescription>
                  {steps[currentStep - 1].title}
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center space-x-2 mb-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex-1 h-2 rounded-full ${
                      step.id <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {renderStepContent()}

              <DialogFooter className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={previousStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep === steps.length ? 
                  <Button 
                  ref={submitButtonRef}
                  onClick={handlePaymentSubmit}
                  disabled={isLoading || posting}
                >
                  {posting ? "Submitting..." : "Submit Deposit"}
                </Button> : (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositAdd;
