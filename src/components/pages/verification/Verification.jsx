import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "/src/assets/logo/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Verification() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 space-y-7 my-5">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
            <Link href={"/"}>
            <Image alt="" src={logo} height={40} width={40} /></Link>
              <span className="text-2xl font-semibold text-gray-800">Jomadder</span>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold tracking-tight text-gray-700">
              Enter verification code
            </h1>
            <p className="text-sm text-gray-500">
              Enter the 6-digit code we sent to{" "}
              <span className="font-medium">sh***********@gmail.com</span>
            </p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Verification code"
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
            <Button className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}