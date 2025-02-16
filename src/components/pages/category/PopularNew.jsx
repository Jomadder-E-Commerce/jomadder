'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import img1 from '@/assets/category/popular/braclite.jpg';
import img2 from '@/assets/category/popular/clip.jpg';
import img3 from '@/assets/category/popular/ear.jpg';
import img4 from '@/assets/category/popular/hallown.jpg';
import CateBags from './CateBags';
import Jewelary from './Jewelary';
import ShoeCategory from './ShoeCategory';
import Watchces from './Watches';
import Sunglasses from './Sunglasses';
import TrendyProduct from './TrendyProduct';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetProductsQuery } from '@/components/Redux/services/productApi/productApi';

const PopularNew = ({button}) => {
    const [products, setProducts] = useState({ popular: [], new: [] });
    // Simulated product data
    const productData = {
        popular: [
            { id: 1, name: 'Stainless steel European', price: '166', image: img1 },
            { id: 2, name: 'Pink bow heat-resistant coffee cup', price: '93', image: img2 },
            { id: 3, name: 'Winter large plush grabber', price: '17', image: img3 },
            { id: 4, name: 'Cross-border wholesale earrings', price: '129', image: img4 }
        ],
        new: [
            { id: 5, name: 'Exquisite flower earrings', price: '116', image: img1 },
            { id: 6, name: 'Stainless steel lucky four-leaf necklace', price: '145', image: img2 },
            { id: 7, name: 'Cross-border hot sale 12 co', price: '114', image: img3 },
            { id: 8, name: 'Creative ceramic coffee cup', price: '435', image: img4 }
        ]
    };

    // Simulating API call
    useEffect(() => {
        setTimeout(() => {
            setProducts(productData); // Replace with real API call
        }, 1000);
    }, []);


    return (

        <div className=''>
            <div className="gap-3 lg:flex">
                {/* Render Popular Products */}
                {products.popular.length > 0 && (
                    <div className="">
                        <h3 className="mb-4 text-lg font-semibold">Popular</h3>
                        <div className="grid gap-2 p-2  border grid-cols-2 xl:grid-cols-4 md:grid-cols-3 rounded-md justify-items-center">
                            {products.popular.map(product => (
                                <div key={product.id} className="p-1  max-w-[260px] w-full h-[240px] cursor-pointer">
                                    <Image unoptimized src={product.image} alt={product.name} width={150} height={150} className="object-cover w-full rounded-md h-[180px]" />
                                    <div className=" space-y-1">
                                        <h2 className="mt-2 text-sm font-semibold truncate w-full">{product.name}</h2>
                                        <p className="font-bold text-red-500">৳ {product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Render New Products */}
                {products.new.length > 0 && (
                    <div className="">
                        <h3 className="mb-4 text-lg font-semibold">New</h3>
                        <div className="grid  border gap-2 p-2 rounded-md grid-cols-2 xl:grid-cols-4 md:grid-cols-3 justify-items-center">
                            {products.new.map(product => (
                                <div key={product.id} className="p-1 max-w-[260px] w-full h-[240px]">
                                    <Image unoptimized src={product.image} alt={product.name} width={150} height={150} className="object-cover w-full rounded-md h-[180px]" />
                                    <div className=" space-y-1">
                                        <h2 className="mt-2 text-sm font-semibold w-full truncate">{product.name}</h2>
                                        <p className="font-bold text-red-500">৳ {product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            
            </div>
            <Link
            href="/all-products"
            className=" flex justify-center items-center mt-8 cursor-pointer"
            >
            <Button>{button}</Button>
          </Link>
            <CateBags button={"View All Begs"} />
            <Jewelary button={"View All Jewelary"}/>
            <ShoeCategory  button={"View All Shows"}/>
            <Watchces button={"View All Watchces"} />
            <Sunglasses  button={"View All Sunglasses"}/>
            <TrendyProduct button={"View All TrendyProduct"} />
        </div>
    );
};

export default PopularNew;
