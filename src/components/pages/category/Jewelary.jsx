'use client'
import React, { useState, useEffect } from 'react';
import ring from '@/assets/category/jwellary/ring.jpg'
import Image from 'next/image';
import ProductCard from '@/components/shared/cards/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const Jewelary = ({button}) => {
    const [jewelarys, setJewelarys] = useState([]);

    // Simulated bag collection data
    const jewelaryData = [
        { id: 1, name: 'Elegant Leather Handbag', price: '200', image: ring },
        { id: 2, name: 'Vintage Canvas Backpack', price: '150', image: ring },
        { id: 3, name: 'Stylish Tote Bag', price: '175', image: ring },
        { id: 4, name: 'Crossbody Shoulder Bag', price: '190', image: ring },
        { id: 5, name: 'Elegant Leather Handbag', price: '200', image: ring },
        { id: 6, name: 'Vintage Canvas Backpack', price: '150', image: ring },
        { id: 7, name: 'Stylish Tote Bag', price: '175', image: ring },
        { id: 8, name: 'Crossbody Shoulder Bag', price: '190', image: ring },
        { id: 9, name: 'Stylish Tote Bag', price: '175', image: ring },
        { id: 10, name: 'Crossbody Shoulder Bag', price: '190', image: ring },
        { id: 11, name: 'Elegant Leather Handbag', price: '200', image: ring },
        { id: 12, name: 'Vintage Canvas Backpack', price: '150', image: ring },
        { id: 13, name: 'Stylish Tote Bag', price: '175', image: ring },
        { id: 14, name: 'Crossbody Shoulder Bag', price: '190', image: ring }
    ];

    // Simulating API call
    useEffect(() => {
        setTimeout(() => {
            setJewelarys(jewelaryData); // Replace with real API call
        }, 1000);
    }, []);
    return (
        <div className=" my-10">
            {/* Render Bag Collection */}
            {jewelarys.length > 0 && (
                <div className="my-6">
                    <h3 className="mb-4 text-lg font-semibold">Jewellary</h3>
                    <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
                        {jewelarys.map(jewelary => (
                           <ProductCard key={jewelary.id} name='name' price={jewelary.price} image={jewelary.image}  />
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

export default Jewelary;