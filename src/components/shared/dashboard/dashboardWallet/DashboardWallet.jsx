"use client";
import React, { useState } from "react";
import { CiWallet } from "react-icons/ci";
import { PiWalletLight } from "react-icons/pi";
import WalletView from "./WalletView";

const DashboardWallet = () => {
  const WalletColumns = [
    { label: "Transaction ID", key: "transactionId" },
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status", type: "button" },
    { label: "Details", key: "details", type: "button" },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-evenly">
        <div className="border px-5 py-10 m-5 md:m-10 md:w-[25%] text-center bg-slate-50 rounded-lg text-slate-600 font-semibold">
          <div className="flex items-center justify-center gap-2">
            <CiWallet className="text-3xl" />
            <p className="text-3xl">Balance</p>
          </div>
          <p className="text-xl mt-2">0.00 BDT</p>
        </div>
      </div>
      <WalletView
        // loading={isLoading}
        title={"Wallet Data"}
        walletColumns={WalletColumns}
      />
    </>
  );
};

export default DashboardWallet;
