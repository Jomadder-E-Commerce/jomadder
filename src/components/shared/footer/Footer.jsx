"use client";
import Image from "next/image";
import FooterSection from "./FooterSection";
import { useRef, useState, useEffect } from "react";
import QR from "@/assets/footer/qrCode.png";
import GooglePlay from "@/assets/footer/googlePlay.png";
import AppStore from "@/assets/footer/appstore-Copy.png";
import logo from "@/assets/logo/logo2.png";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, X, Youtube } from "lucide-react";
import Link from "next/link";
import bkash from "@/assets/footer/bkash.png";
import nagad from "@/assets/footer/nagad.png";
import master from "@/assets/footer/master.svg";
import visa from "@/assets/footer/visa.svg";
import islamiBank from "@/assets/footer/islamibank.png";
import bangladesh from "@/assets/footer/bangladesh.png";
import china  from "@/assets/footer/china.png";
import { PiTiktokLogoLight } from "react-icons/pi";
import ScrollToTop from "../scroll/ScrollToTop";

const countryFlags = [
  {
    id: 1,
    name: "Bangladesh",
    svg: bangladesh,
  },
  {
    id: 2,
    name: "China",
    svg: china,
  },
];

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(countryFlags[0]);
  const [isOpen, setIsOpen] = useState(false);
  // Create a ref for the dropdown container
  const dropdownRef = useRef(null);

  // Retrieve saved country from local storage on component mount
  useEffect(() => {
    const storedCountryId = localStorage.getItem("selectedCountryId");
    if (storedCountryId) {
      const savedCountry = countryFlags.find(
        (item) => item.id === Number(storedCountryId)
      );
      if (savedCountry) {
        setSelectedCountry(savedCountry);
      }
    }
  }, []);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to refresh the page
  const RefreshPage = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  const Accounts = [
    // { title: "My Profile", href: "/profile" },
    // { title: "Login", href: "/login" },
    // { title: "Cart", href: "/cart" },
    // { title: "Wishlist", href: "/wishlist" },
    { title: "FAQ", href: "/faq" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Use", href: "/termsOfUse" },

    // { title: "Contact", href: "/contact-us" },
  ];

  const QuickLinks = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Use", href: "/termsOfUse" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact-us" },
  ];

  const Support = [
    {
      href: "https://maps.app.goo.gl/tiQVuXYN4reVHbK89",
      icon: <MapPin className="w-4 h-4" />,
      title: "H-2553, Sayednagar, Vatara, Gulshan-2, Dhaka-1212",
    },
    {
      href: "mailto:parceltrade@gmail.com",
      icon: <Mail className="w-4 h-4" />,
      title: "parceltrade@gmail.com",
    },
    {
      href: "tel:+8801767559231",
      icon: <Phone className="w-4 h-4" />,
      title: "+8801879314050",
    },
  ];

  const SocialMedia = [
    {
      href: "https://www.facebook.com/parceltradebd",
      icon: <Facebook className="md:w-6 w-4 md:h-6 h-4" />,
      name: "Facebook",
    },
    {
      href: "https://www.instagram.com/parceltradebd/",
      icon: <Instagram className="md:w-6 w-4 md:h-6 h-4" />,
      name: "Instragram",
    },
    {
      href: "https://twitter.com/parceltradebd",
      icon: <Linkedin className="md:w-6 w-4 md:h-6 h-4" />,
      name: "LinkedIn",
    },
    {
      href: "https://twitter.com/parceltradebd",
      icon: <X className="md:w-6 w-4 md:h-6 h-4" />,
      name: "Twitter",
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/channel/UCbV5Gv9l6ZV0K4E3V2t5L5g",
      icon: <Youtube className="md:w-6 w-4 md:h-6 h-4" />,
    },
    {
      href: "https://www.tiktok.com/@parceltradebd",
      icon: <PiTiktokLogoLight className="md:text-2xl text-lg" />,
      name: "Tiktok",
    },
  ];

  return (
    <>
      <footer className="w-full border-t bg-white md:pb-0 pb-14 relative">
        {/* Top Section */}
        <div className="mx-auto py-4">
          <div className="flex flex-col md:flex-row justify-around items-center gap-5 container">
            {/* Company Location */}
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-gray-700 font-medium">Jommader in</h3>
              {/* Attach the ref to the container */}
              <div className="relative w-64" ref={dropdownRef}>
                <div
                  className="flex items-center justify-between bg-white border rounded-md pl-3 max-w-[140px] mx-auto py-2 cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedCountry.svg}
                      alt={selectedCountry.name}
                      width={20}
                      height={15}
                    />
                    <span>{selectedCountry.name}</span>
                  </div>
                </div>

                {isOpen && (
                  <ul className="absolute left-14 mt-1 w-full bg-white max-w-[160px] border rounded-md shadow-lg z-10 transition-all duration-300 ease-out">
                    {countryFlags.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCountry(item);
                          localStorage.setItem("selectedCountryId", item.id);
                          setIsOpen(false);
                          RefreshPage();
                        }}
                      >
                        <Image
                          src={item.svg}
                          alt={item.name}
                          width={20}
                          height={15}
                        />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold text-gray-700">
                Shop smarter with our Apps
              </span>
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src={GooglePlay}
                  alt="Google Play"
                  className="w-[120px] h-[32px] rounded-lg"
                />
                <Image
                  src={AppStore}
                  alt="App Store"
                  className="w-[120px] h-[32px] rounded-lg"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 flex-col">
              <span className="text-gray-700">Follow Us</span>
              <div className="flex gap-4 flex-wrap justify-center items-center">
                {SocialMedia?.map((item, index) => (
                  <a target="_blank" key={index} href={item.href}>
                    <div className="text-gray-800 bg-[#F2F2F2] flex justify-center items-center md:p-2 p-1.5 rounded-full hover:text-[#0D6EFD]">
                      {item.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t bg-gray-100">
          <div className="container mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-center container gap-4">
              <div className="">
                <p className="text-sm text-gray-900 font-medium">
                  ©️ 2025 Jomadder. All rights reserved
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {Accounts?.map((account, key) => (
                  <Link
                    key={key}
                    href={account?.href}
                    className="text-gray-800 rounded-full hover:text-[#0D6EFD]"
                  >
                    {account?.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t bg-primary">
          <div className="container mx-auto py-5">
            <div className="flex md:justify-center justify-start items-center container gap-4">
              <ScrollToTop className={"border border-white absolute bg-primary md:bottom-5 bottom-[75px]"} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
