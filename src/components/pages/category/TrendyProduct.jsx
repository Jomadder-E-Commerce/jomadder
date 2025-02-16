'use client'
import React, { useState, useEffect } from 'react';
import lipstick from '@/assets/category/trendyPro/lipstick.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TrendyProduct = ({button}) => {
    const [trendys, setTrendys] = useState([]);
    // Simulated bag collection data
    const trendyData = [
        { id: 1, name: 'Elegant Leather Handbag', price: '200', image: lipstick },
        { id: 2, name: 'Vintage Canvas Backpack', price: '150', image: lipstick },
        { id: 3, name: 'Stylish Tote Bag', price: '175', image: lipstick },
        { id: 4, name: 'Crossbody Shoulder Bag', price: '190', image: lipstick },
        { id: 5, name: 'Elegant Leather Handbag', price: '200', image: lipstick },
        { id: 6, name: 'Vintage Canvas Backpack', price: '150', image: lipstick },
        { id: 7, name: 'Stylish Tote Bag', price: '175', image: lipstick },
        { id: 8, name: 'Crossbody Shoulder Bag', price: '190', image: lipstick },
        { id: 9, name: 'Stylish Tote Bag', price: '175', image: lipstick },
        { id: 10, name: 'Crossbody Shoulder Bag', price: '190', image: lipstick },
        { id: 11, name: 'Elegant Leather Handbag', price: '200', image: lipstick },
        { id: 12, name: 'Vintage Canvas Backpack', price: '150', image: lipstick },
        { id: 13, name: 'Stylish Tote Bag', price: '175', image: lipstick },
        { id: 14, name: 'Crossbody Shoulder Bag', price: '190', image: lipstick }
    ];

    // Simulating API call
    useEffect(() => {
        setTimeout(() => {
            setTrendys(trendyData); // Replace with real API call
        }, 1000);
    }, []);
    return (
        <div className=" my-10">
            {/* Render Bag Collection */}
            {trendys.length > 0 && (
                <div className="my-6">
                    <h3 className="mb-4 text-lg font-semibold text-center">Trendy Products</h3>
                    <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
                        {trendys.map(trendy => (
                            <div key={trendy.id} className=" w-full h-[300px] p-1 border xl:max-w-full max-w-xs rounded-md">

                                <div>
                                    <Image unoptimized src={trendy.image} alt={trendy.name} className="object-cover w-full rounded-md h-52" />
                                    <h2 className="mt-2 text-sm font-semibold text-start">{trendy.name}</h2>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-bold text-red-500">৳ {trendy.price}</p>
                                        <p>Sold: 33</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
              <Link
            href="/all-products"
            className=" flex justify-center items-center mt-8 cursor-pointer"
            >
            <Button>{button}</Button>
          </Link>
        </div>
    );
};

export default TrendyProduct;