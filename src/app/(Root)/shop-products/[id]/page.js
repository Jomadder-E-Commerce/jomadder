import ShopProducts from '@/components/pages/ProductDetails/shopDetails/ShopProducts';
import React from 'react';

const page = ({params}) => {
    const id = params.id
   
    return (
        <div>
            <ShopProducts id={id}/>
        </div>
    );
};

export default page;