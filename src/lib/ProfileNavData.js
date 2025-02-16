import React from 'react';
import { CiBadgeDollar } from 'react-icons/ci';
// import { CiBadgeDollar, CiLocationOn, CiMenuBurger, CiWallet } from "react-icons/ci";
import { GoPerson } from 'react-icons/go';
import { GrMenu } from "react-icons/gr";
import { LuWallet } from 'react-icons/lu';
import { MdOutlineDashboard, MdSupportAgent } from 'react-icons/md';


const ProfileData = [
    { route: "/profile/dashboard", name: "Dashboard", icon: <MdOutlineDashboard />, text:"Overview"},
    { route: "/profile", name: "Profile info", icon: <GoPerson /> , text:"Profile info"},
    { route: "/profile/order", name: "My Order", icon: <GrMenu /> , text:"My Order"},
    // { route: "/profile/wallet", name: "Wallet", icon: <CiWallet />},
    { route: "/profile/transaction", name: "Transaction", icon: <LuWallet />, text:"Transaction"},
    { route: "/profile/deposit", name: "Deposit", icon: <CiBadgeDollar />, text:"Deposit"},
    { route: "/profile/support", name: "Support", icon: <MdSupportAgent />, text:"Support"},
];


export default ProfileData;
