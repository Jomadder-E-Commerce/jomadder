"use client"
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
const StatsCard = ({ icon, number, label,suffix = ''}) => {
    return (
        <div
        className="bg-white rounded-lg p-6 w-full text-center shadow-lg border hover:border-primary transition-all duration-500 border-gray-200 max-w-[300px] mx-auto flex flex-col items-center"
    >
      <div className="flex justify-center mb-4">
          <Image unoptimized src={icon} alt={`${icon}`} className="w-[30px]" />
      </div>
      <h3 
        className="text-4xl font-bold mb-2 text-gray-900"
      >
        <CountUp start={0} end={number} duration={2} />{suffix}
      </h3>
      <p className="text-lg text-gray-600">{label}</p>
    </div>
    );
};

export default StatsCard;