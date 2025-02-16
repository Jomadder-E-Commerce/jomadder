"use client";
import ShopDetails from '@/components/pages/ProductDetails/shopDetails/ShopDetails';
import { useGetSingleProductQuery } from '@/components/Redux/services/productApi/productApi';
import { useRouter } from 'next/navigation';
import React from 'react';

const ShopDetail = ({params}) => {
    const id = params.id;

    return (
        <div>
            <ShopDetails  id={id}/>
        </div>
    );
};

export default ShopDetail;