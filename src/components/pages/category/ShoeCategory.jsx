
'use client'
import React, { useState, useEffect } from 'react';
import shoe from '@/assets/category/shoe/shoe.jpg'
import Image from 'next/image';
import ProductCard from '@/components/shared/cards/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const ShoeCategory = ({button}) => {
    const [shoes, setShoes] = useState([]);

    // Simulated bag collection data
    const shoeData = [
        { id: 1, name: 'Elegant Leather Handbag', price: '200', image: shoe },
        { id: 2, name: 'Vintage Canvas Backpack', price: '150', image: shoe },
        { id: 3, name: 'Stylish Tote Bag', price: '175', image: shoe },
        { id: 4, name: 'Crossbody Shoulder Bag', price: '190', image: shoe },
        { id: 5, name: 'Elegant Leather Handbag', price: '200', image: shoe },
        { id: 6, name: 'Vintage Canvas Backpack', price: '150', image: shoe },
        { id: 7, name: 'Stylish Tote Bag', price: '175', image: shoe },
        { id: 8, name: 'Crossbody Shoulder Bag', price: '190', image: shoe },
        { id: 9, name: 'Stylish Tote Bag', price: '175', image: shoe },
        { id: 10, name: 'Crossbody Shoulder Bag', price: '190', image: shoe },
        { id: 11, name: 'Elegant Leather Handbag', price: '200', image: shoe },
        { id: 12, name: 'Vintage Canvas Backpack', price: '150', image: shoe },
        { id: 13, name: 'Stylish Tote Bag', price: '175', image: shoe },
        { id: 14, name: 'Crossbody Shoulder Bag', price: '190', image: shoe }
    ];

    // Simulating API call
    useEffect(() => {
        setTimeout(() => {
            setShoes(shoeData); // Replace with real API call
        }, 1000);
    }, []);
    return (
        <div className=" my-10">
            {/* Render Bag Collection */}
            {shoes.length > 0 && (
                <div className="my-6">
                    <h3 className="mb-4 text-lg font-semibold">Shoes</h3>
                    <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
                        {shoes.map(shoe => (
                           <ProductCard key={shoe.id} name={shoe.name} price={shoe.price} image={shoe.image}  />
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

export default ShoeCategory;