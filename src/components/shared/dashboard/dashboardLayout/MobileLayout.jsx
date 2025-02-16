"use client";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import { IoBag } from "react-icons/io5";
import "react-modern-drawer/dist/index.css";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import LayoutBar from "./LayoutBar";
import { CiCircleCheck } from "react-icons/ci";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import ProfileData from "@/lib/ProfileNavData";
import { logout } from "@/components/Redux/features/AllSlice/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";



const MobileLayout = () => {
  const { userRole, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuData = ProfileData;
  const router = usePathname();
  const dispatch = useDispatch();
  const [selectedText,setSelectedText] = useState(menuData?.find((menuItem) => menuItem?.route === router)?.text)
   console.log(selectedText)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

    const logOut = ()=>{
      
             dispatch(logout())
              window.location.href = `/login`
            
    }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

 
  useEffect(()=>{
    setSelectedText(menuData?.find((menuItem) => menuItem?.route === router)?.text)
  },[router])

  return (
    <>
      <div className="w-full px-3 py-1 lg:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleDrawer}
            className="hover:bg-foundation/60 p-2 text-xl"
          >
            <IoIosMenu />
          </button>
          <span className="text-lg font-medium text-gray-700">{selectedText}</span>
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <div className="flex h-full w-full flex-col justify-between bg-white py-10 drop-shadow-sm overflow-y-auto lg:hidden">
            {/* user */}
            <div className="pl-4">
              <div className="">
                <div href="/" className="flex gap-3  items-center justify-center">
                <Link href="/" className="flex gap-2 items-center justify-center">
              <Image src={logo} alt="logo" width={60} height={60} />
            </Link>
                  {/* <h4>Jomadder</h4> */}
                </div>
              </div>

              <div className="pb-5 mb-6 border-b">
                {/* <h3 className="font-semibold my-2 flex ">
                  Hello {user?.name || user?.email}
                </h3> */}
                {/* <p className="text-gray-400 text-sm">{user?.email}</p> */}
                {/* <div className="flex items-center mt-2">
                  <span className="px-3 py-1 font-semibold rounded-md text-sm">
                    {user?.balance  || 0}
                    <span className="font-medium ms-1">BDT</span>
                  </span>
                  <span className="text-xl text-green-500">
                    <CiCircleCheck />
                  </span>
                </div> */}
              </div>

              <div className="mt-4 flex flex-col">
                <div className="mb-5 flex flex-col gap-2">
                  <div className="flex flex-col gap-3 text-[14px] text-[#637381]">
                    {menuData?.map((item, _id) => {
                      const isActive = router === item?.route;
                      return item?.underRoutes ? (
                        <LayoutBar item={item} key={_id} />
                      ) : (
                        <Link
                          key={_id}
                          className={`flex items-center gap-2 hover:bg-secondary ${
                            isActive
                              ? "bg-secondary p-2 rounded-lg"
                              : "p-2 rounded-lg"
                          }`}
                          href={item?.route}
                        >
                          {item?.icon} {item?.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 px-4 mb-3 ">
          <button onClick={logOut} className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md w-full">Log Out</button>
        </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default MobileLayout;
