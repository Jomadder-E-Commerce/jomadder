"use client";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import { IoBag } from "react-icons/io5";
import "react-modern-drawer/dist/index.css";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutBar from "./LayoutBar";
import { CiCircleCheck } from "react-icons/ci";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import ProfileData from "@/lib/ProfileNavData";
import { logout } from "@/components/Redux/features/AllSlice/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import logo from "@/assets/logo/logo2.png";

const MobileLayout = () => {
  const { userRole, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuData = ProfileData;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState(
    menuData?.find((menuItem) => pathname.startsWith(menuItem?.route))?.text || ""
  );

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const logOut = () => {
    dispatch(logout());
    router.push("/login");
    toggleDrawer();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const matchedItem = menuData.find((menuItem) =>
      pathname.includes(menuItem?.route)
    );
//  console.log(pathname, matchedItem)
 
    setSelectedText(matchedItem?.text || "");
  }, [pathname, menuData]);

  return (
    <div className="w-full px-3 py-1 lg:hidden">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-700">{selectedText}</span>
        <button
          onClick={toggleDrawer}
          className="hover:bg-foundation/60 p-2 text-xl"
          aria-label="Open navigation menu"
        >
          <IoIosMenu />
        </button>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
        size={300}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white py-10 drop-shadow-sm overflow-y-auto lg:hidden">
          <div className="pl-4">
            <div className="mb-6">
              <Link 
                href="/" 
                className="flex gap-2 items-center justify-center"
                onClick={toggleDrawer}
              >
                <Image 
                  src={logo} 
                  alt="logo" 
                  width={60} 
                  height={60} 
                  priority
                />
              </Link>
            </div>

            <div className="pb-5 mb-6 border-b">
              {user && (
                <div className="space-y-1">
                  <h3 className="font-semibold">{user?.name || user?.email}</h3>
                  {user?.balance !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {user.balance} BDT
                      </span>
                      <CiCircleCheck className="text-green-500" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col">
              <div className="mb-5 flex flex-col gap-2">
                <div className="flex flex-col gap-3 text-[14px] text-[#637381]">
                  {menuData?.map((item, _id) => {
                    const isActive = pathname.includes(item?.route);
                    return item?.underRoutes ? (
                      <LayoutBar 
                        item={item} 
                        key={_id} 
                        toggleDrawer={toggleDrawer}
                      />
                    ) : (
                      <Link
                        key={_id}
                        className={`flex items-center gap-2 hover:bg-secondary ${
                          isActive
                            ? "bg-secondary p-2 rounded-lg"
                            : "p-2 rounded-lg"
                        }`}
                        href={item?.route}
                        onClick={toggleDrawer}
                      >
                        {item?.icon} {item?.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 mb-3">
            <button 
              onClick={logOut}
              className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md w-full hover:bg-primary-dark transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileLayout;