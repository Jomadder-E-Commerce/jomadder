'use client'
import React, { useState, useEffect } from 'react';
import watch from '@/assets/category/watches/watch.jpg'
import Image from 'next/image';
import ProductCard from '@/components/shared/cards/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Watchces = ({button}) => {
    const [watches, setWatches] = useState([]);

    // Simulated bag collection data
    const watchData = [
        { id: 1, name: 'Elegant Leather Handbag', price: '200', image: watch },
        { id: 2, name: 'Vintage Canvas Backpack', price: '150', image: watch },
        { id: 3, name: 'Stylish Tote Bag', price: '175', image: watch },
        { id: 4, name: 'Crossbody Shoulder Bag', price: '190', image: watch },
        { id: 5, name: 'Elegant Leather Handbag', price: '200', image: watch },
        { id: 6, name: 'Vintage Canvas Backpack', price: '150', image: watch },
        { id: 7, name: 'Stylish Tote Bag', price: '175', image: watch },
        { id: 8, name: 'Crossbody Shoulder Bag', price: '190', image: watch },
        { id: 9, name: 'Stylish Tote Bag', price: '175', image: watch },
        { id: 10, name: 'Crossbody Shoulder Bag', price: '190', image: watch },
        { id: 11, name: 'Elegant Leather Handbag', price: '200', image: watch },
        { id: 12, name: 'Vintage Canvas Backpack', price: '150', image: watch },
        { id: 13, name: 'Stylish Tote Bag', price: '175', image: watch },
        { id: 14, name: 'Crossbody Shoulder Bag', price: '190', image: watch }
    ];

    // Simulating API call
    useEffect(() => {
        setTimeout(() => {
            setWatches(watchData); // Replace with real API call
        }, 1000);
    }, []);
    return (
        <div className=" my-10">
            {/* Render Bag Collection */}
            {watches.length > 0 && (
                <div className="my-6">
                    <h3 className="mb-4 text-lg font-semibold">Watches</h3>
                    <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
                        {watches.map(watch => (
                            <ProductCard key={watch.id} name={watch.name} price={watch.price} image={watch.image} />
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

export default Watchces;