
"use client";
import { useEffect, useRef, useState } from "react";
import Whatsapp from "@/assets/speedDial/whatsapp.svg";
import Telegram from "@/assets/speedDial/telegram.svg";
import Wechat from "@/assets/speedDial/wechat.svg";
import Messenger from "@/assets/speedDial/messenger.svg";
import WhatsappQR from "@/assets/speedDial/whatsapp.jpg"
import WechatQR from "@/assets/speedDial/wechat.jpg"
import weChatImg from "@/assets/speedDial/wechat.png"
import whatsAppImg from "@/assets/speedDial/whatsApp.png"
import messengerImg from "@/assets/speedDial/messenger.jpg"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoMdChatboxes } from "react-icons/io";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const SpeedDial = () => {

  const [selectedQR, setSelectedQR] = useState("");
  const [copied, setCopied] = useState(false);
  // const [showTooltip, setShowTooltip] = useState(false);
  // const [showText,setShowText ] = useState()
  const handleCopy = () => {
    const idToCopy = "disalamin94"; // Replace with dynamic value if needed
    navigator.clipboard.writeText(idToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    });
  };
  const qrPreviewRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        qrPreviewRef.current &&
        !qrPreviewRef.current.contains(event.target)
      ) {
        setSelectedQR("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    console.log("Selected QR Updated:", selectedQR);
  }, [selectedQR]);

 
  const svgs = [
    {
      svg: <Image src={weChatImg} alt="Wechat" className="rounded-full bg-none" width={32} height={32} />,
      qrCode: "wechat",
    },
    {
      svg: <Image src={whatsAppImg} alt="Whatsapp" className="rounded-full bg-none" width={32} height={32} />,
      qrCode: "whatsapp",
      link:"https://wa.me/8801879314050"

    },

    {
      svg: <Image src={messengerImg} alt="Messenger" className="rounded-full bg-none" width={32} height={32} />,
      qrCode: "messenger",
      link:"https://m.me/parceltradeinternational"
    }
    // {
    //   svg: <Image src={Telegram.src} alt="Telegram" width={24} height={24} />,
    //   qrCode: "telegram",
    // },
  ];

  return (
    <div className="h-[300px] relative rotate-180">

      <div className="group flex flex-col items-center justify-center w-max mx-auto absolute md:top-0 -top-10 left-[50%] -translate-x-1/2">
        {/* + icon */}
        {/* this text will not appear if the website is /profile href*/}
 <span className="text-[11px] text-primary font-medium md:hidden rotate-180">Chat</span>

        <div className={cn("flex justify-center  bg-[#0095FF] rounded-full items-center  hover:bg-[#0095FF]/80 duration-500", { 'rotate-180': selectedQR })}>
          <IoMdChatboxes className="sm:p-2 p-1 text-white  md:size-10 sm:size-8 size-6 transition-all group-hover:opacity-0 opacity-100 block group-hover:hidden" />
                   <RxCross2 className="sm:p-2 p-1 text-white  md:size-10 sm:size-8 size-6 transition-all group-hover:opacity-100 opacity-0 hidden group-hover:block" />

        </div>

        {/* Icon container */}
        <div className={cn("h-0 space-y-4 duration-500 group-hover:my-4 group-hover:h-full", { 'my-4': selectedQR })}>
          {/* Icon Map */}
          {svgs.map((svg, idx) => (
            <div
              key={idx}
              className={` cursor-pointer rotate-180 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 ${idx === 0
                ? "delay-[200ms] group-hover:delay-[100ms]"
                : idx === 1
                  ? "delay-[300ms] group-hover:delay-[200ms]"
                  : idx === svgs.length - 1
                    ? "delay-[400ms] group-hover:delay-[300ms]" // Last icon has the longest delay
                    : "delay-[350ms] group-hover:delay-[250ms]"
                } ${selectedQR && "scale-100 opacity-100"}`}
            >
           {
            svg.qrCode == 'wechat' ?   <div
            onClick={() => setSelectedQR(svg.qrCode)}
            className="flex items-center justify-center w-full h-full duration-300 rounded-full"
          >
            {svg.svg}
          </div>:   <Link
                href={svg.link}
                target="_blank"
                    className="flex items-center justify-center w-full h-full duration-300 rounded-full "
              >
                {svg.svg}
              </Link>
           }
            
            </div>
          ))}
        </div>
      </div>

      {/* Preview QR */}
      {selectedQR === 'wechat' && (
        <div
        ref={qrPreviewRef}
        className="absolute rotate-180 top-20 bg-white left-5 md:left-8 text-nowrap md:h-[220px] h-[210px] md:w-[220px] w-[210px] drop-shadow-sm shadow-lg rounded-lg"
      >
        <h2 className="text-[15px] px-3 pt-1 relative top-1 flex items-center">
          ID: disalamin94
          <FaCopy
            onClick={handleCopy}
              className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
            title="Copy ID"
          /> {copied && (
            <span className="text-green-500 text-[12px] pl-2">
              Copied!
            </span>
          )}
        </h2>
        
        {/* <Image src={QR} alt="" height={500} width={500} className=""/> */}
        <Image
          src={WechatQR}
          height={400}
          width={400}
          alt="Whatsapp QR"
          className="rounded-lg"
        />
      </div>
      )}
      {selectedQR === 'whatsapp' && (
        <div
          ref={qrPreviewRef}
          className="absolute rotate-180 top-[65px] left-5 md:left-8 text-nowrap h-[300px] w-[300px] drop-shadow-sm shadow-lg rounded-lg border"
        >
          
          {/* <Image src={QR} alt="" height={500} width={500} className=""/> */}
          <Image src={WhatsappQR} height={400} width={400} alt="Whatsapp QR" className="rounded-lg" />
          
        </div>
      )}
      
    </div>
  );
};

export default SpeedDial;
