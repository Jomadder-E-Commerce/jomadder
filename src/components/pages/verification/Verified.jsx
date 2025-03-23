import { Button } from "@/components/ui/button";
import logo from "/src/assets/logo/logo2.png";
import checked from "/src/assets/logo/checklist.png";
import Image from "next/image";
import Link from "next/link";

export default function Verified() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 space-y-7 my-5">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
            <Link href={"/"}>
            <Image alt="" src={logo} height={50} width={50} /></Link>
              <span className="text-2xl font-semibold text-gray-800">
                Jomadder
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-y-5 items-center">
            <Image alt="" src={checked} height={60} width={60} />
            <div className="text-center">
              <p className="text-primary text-lg">Successfully Verified</p>
              <p className="text-gray-500 mt-5 mb-2">
                Thank you for confirming your contact information
              </p>
              <p className="text-lg">
                Its help us ensure the security of your account and enable us to
                provide better support to you. Now please login to continue
              </p>
              <Button className='mt-3 w-full'>Login</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
