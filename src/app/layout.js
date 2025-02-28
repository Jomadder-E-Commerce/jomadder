import localFont from "next/font/local";
import "./globals.css";
import ReduxWrapper from "../../Provider/redux/ReduxWrapper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SpeedDial from "@/components/pages/homePage/SpeedDial";
import SpeedDialPortal from "@/components/shared/portal/SpeedDialPortal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Home | Jomadder Ecommerce",
  description: "Home Page of Jomadder Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <ReduxWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div> {children} </div>
          <ToastContainer autoClose={1999} closeOnClick/>
        </body>
      </html>
    </ReduxWrapper>
  );
}
