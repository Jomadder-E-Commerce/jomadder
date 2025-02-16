"use client";
import logo from "@/assets/logo/logo.png";
import LayoutBar from "./LayoutBar";
import ProfileData from "@/lib/ProfileNavData";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { deleteCookie, removeLocalStorage } from "../../LocalStorage/LocalStorage";
import { useDispatch } from "react-redux";
import { logout } from "@/components/Redux/features/AllSlice/authSlice";

const DesktopLayout = () => {
  const { userRole, user, loading } = useUser();
  const router = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const menuData = ProfileData

  const logOut = ()=>{
           dispatch(logout())
            window.location.href = `/login`
          
  }
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 min-h-screen w-72 flex flex-col justify-between border-r pt-24 bg-white drop-shadow-sm">
        {/* User Info Section */}
        <div className="px-8">
          {/* <div className="py-5">
            <Link href="/" className="flex gap-2 items-center justify-center">
              <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
          </div> */}
          <div className="pb-5 mb-6 ">
            {/* <h3 className="font-semibold text-lg">
              {loading ? (
                <div className="h-5 w-56 bg-gray-200 animate-pulse rounded mb-2"></div>
              ) : (
                <span className="uppercase">{user?.name}</span>
              )}
            </h3>
            <div className="text-gray-400">
              {loading ? (
                <div className="h-5 w-48 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                user?.email
              )}
            </div> */}
            {/* <div className="flex items-center mt-2">
              <span className="px-3 py-1 font-semibold rounded-md text-sm">
                0.00
                <span className="font-medium ms-1">BDT</span>
              </span>
              <span className="text-xl text-green-500">
                <CiCircleCheck />
              </span>
            </div> */}
          </div>
        </div>

        {/* Scrollable Navigation Menu */}
        <div
          className="flex-grow overflow-y-auto px-8"
          style={{
            scrollbarWidth: "thin",
            msOverflowStyle: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex flex-col gap-5 mt-3 text-lg">
              {menuData?.map((item, _id) => {
                const isActive = router === item?.route;

                return item?.underRoutes ? (
                  <LayoutBar item={item} key={_id} />
                ) : (
                  <> <Link
                    key={_id}
                    className={`flex items-center gap-2 hover:bg-secondary ${
                      isActive
                        ? "bg-secondary p-2 rounded-lg"
                        : "p-2 rounded-lg"
                    }`}
                    href={item?.route}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-2xl">{item?.icon}</span>
                    {item?.name}
                  </Link>
                  </>
                 
                );
              })}
            </div>
          </div>
        </div>


        <div className="mt-6 px-4 mb-3 ">
          <button onClick={logOut} className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md w-full">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
