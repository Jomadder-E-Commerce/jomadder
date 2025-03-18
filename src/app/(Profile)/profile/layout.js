import SpeedDial from "@/components/pages/homePage/SpeedDial";
import DashboardLayout from "@/components/shared/dashboard/dashboardLayout/DashboardLayout";
import MobileLayout from "@/components/shared/dashboard/dashboardLayout/MobileLayout";
import Footer from "@/components/shared/footer/Footer";
import MiddleBar from "@/components/shared/middlebar/MiddleBar";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Redirection from "@/components/shared/Redirection/Redirection";
import TopBar from "@/components/shared/TopBar";
import React from "react";
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";
import ProtectedPageWrapper from "@/hooks/ProtectedPageWrapper";
export default function layout({ children }) {
  return (
 
    <div>  
      <ProtectedPageWrapper>
    <TopBar />
       <MiddleBar />
       <AuthUserPageWrapper>
          <div className="flex flex-col lg:flex-row">

      <div className="lg:w-[310px] hidden lg:block">
        <DashboardLayout />
        <Redirection/>
      </div>
      <MobileLayout />
      
      <div className="lg:w-[calc(100%-185px)] w-full flex flex-col gap-6 md:gap-10 md:pt-0  ">
        <div className="min-h-[75vh]">{children}</div>
        <Footer/>
        </div>
    </div>

    <div className="fixed z-50 md:bottom-4 bottom-12 md:right-12 right-9">
                <SpeedDial className=''/>
              {/* <SpeedDialPortal/> */}
            </div>
    <div className="flex md:hidden ">
        <MobileNavbar />
      </div>
       </AuthUserPageWrapper>
      </ProtectedPageWrapper>
    </div>
   
  

    
  );
}
