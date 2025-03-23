"use client"
import React, { useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts';
import { Jewelry } from '@/data/Jewelry';
import { Watch } from '@/data/Watch';
import { HomeDecor } from '@/data/HomeDecor';
import { ActiveWear } from '@/data/ActiveWear';

const Products = () => {
    // console.log("Watch",Watch, "Jewelry",Jewelry, "HomeDecor",HomeDecor, "ActiveWear",ActiveWear)
    return (
        <div className="flex flex-col gap-4 container">

            <CategoryProducts title='Watch' items={Watch[Math.floor(Math.random() * 10)].slice(0, 18)} />
            <CategoryProducts title='Jewelry' items={Jewelry[Math.floor(Math.random() * 10)].slice(0, 18)} />
            <CategoryProducts title='Home Decor' items={HomeDecor[Math.floor(Math.random() * 10)].slice(0, 18)} />
            <CategoryProducts title='Activewear' items={ActiveWear[Math.floor(Math.random() * 10)].slice(0, 18)} />

        </div>
    );
};

export default Products;
