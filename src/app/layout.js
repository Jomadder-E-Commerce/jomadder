import localFont from "next/font/local";
import "./globals.css";
import ReduxWrapper from "../../Provider/redux/ReduxWrapper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SpeedDial from "@/components/pages/homePage/SpeedDial";
import SpeedDialPortal from "@/components/shared/portal/SpeedDialPortal";
import Script from "next/script";

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

          <ToastContainer autoClose={1999} closeOnClick />

          {/* <Script src={`https://chatapi.majjicon.com/widget2/load?id=e12bbab8-9035-3578-8244-315815a7a3e3&r='}`} strategy="lazyOnload" /> */}

        </body>

      </html>
    </ReduxWrapper>
  );
}
