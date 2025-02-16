'use client'
import React, { useState, useEffect } from 'react';
import sunglass from '@/assets/category/sunglass/sunglass.jpg'
import Image from 'next/image';
import ProductCard from '@/components/shared/cards/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Sunglasses = ({button}) => {
    const [sunglasses, setSunglasses] = useState([]);

    // Simulated bag collection data
    const sunglassData = [
        { id: 1, name: 'Elegant Leather Handbag', price: '200', image: sunglass },
        { id: 2, name: 'Vintage Canvas Backpack', price: '150', image: sunglass },
        { id: 3, name: 'Stylish Tote Bag', price: '175', image: sunglass },
        { id: 4, name: 'Crossbody Shoulder Bag', price: '190', image: sunglass },
        { id: 5, name: 'Elegant Leather Handbag', price: '200', image: sunglass },
        { id: 6, name: 'Vintage Canvas Backpack', price: '150', image: sunglass },
        { id: 7, name: 'Stylish Tote Bag', price: '175', image: sunglass },
        { id: 8, name: 'Crossbody Shoulder Bag', price: '190', image: sunglass },
        { id: 9, name: 'Stylish Tote Bag', price: '175', image: sunglass },
        { id: 10, name: 'Crossbody Shoulder Bag', price: '190', image: sunglass },
        { id: 11, name: 'Elegant Leather Handbag', price: '200', image: sunglass },
        { id: 12, name: 'Vintage Canvas Backpack', price: '150', image: sunglass },
        { id: 13, name: 'Stylish Tote Bag', price: '175', image: sunglass },
        { id: 14, name: 'Crossbody Shoulder Bag', price: '190', image: sunglass }
    ];

    // Simulating API call
    useEffect(() => {
        setTimeout(() => {
            setSunglasses(sunglassData); // Replace with real API call
        }, 1000);
    }, []);
    return (
        <div className=" my-10">
            {/* Render Bag Collection */}
            {sunglasses.length > 0 && (
                <div className="my-6">
                    <h3 className="mb-4 text-lg font-semibold">Sunglass</h3>
                    <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
                        {sunglasses.map(sunglass => (
                            <ProductCard key={sunglass.id} name={sunglass.name} price={sunglass.price} image={sunglass.image}  />
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

export default Sunglasses;