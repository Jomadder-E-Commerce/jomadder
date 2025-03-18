import SpeedDial from "@/components/pages/homePage/SpeedDial";
import Footer from "@/components/shared/footer/Footer";
import MiddleBar from "@/components/shared/middlebar/MiddleBar";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import TopBar from "@/components/shared/TopBar";
import React from "react";
const layout = ({ children }) => {
  return (
    <div className="">
      <TopBar />
      <MiddleBar />
      <div className="flex md:hidden">
        <MobileNavbar />
      </div>
      {/* <Navbar /> */}
      {children}
      <div className="fixed md:bottom-4 hidden md:block bottom-12 md:right-12 right-9 z-[40]">
        <SpeedDial className='' />
        {/* <SpeedDialPortal/> */}
      </div>
      <Footer />
      {/* {"orgId":"team_6iM3ycdvBV4YAVgb30qJDD6K","projectId":"prj_54WoYMLD0FxCEZHbdiv3Q4boxjzX"} */}
    </div>
  );
};

export default layout;
