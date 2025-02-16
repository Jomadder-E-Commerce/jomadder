"use client";
import React, { useState } from 'react';
import CartProduct from './CartProduct';
import CartQuantity from './CartQuantity';
import EmptyPage from '@/components/EmptyPage/EmptyPage';
import { ShoppingCart } from 'lucide-react';
import CartSkeleton from '@/components/all-skeleton/cartSkeleton/CartSkeleton';
import moment from 'moment';
import { getDataFromLocalStorage } from '@/utils/localstorage';

const CartPage = ({data,setData}) => {
    // const { data, isLoading } = useGetCartListQuery();
    // const [data, setData] = useState(getDataFromLocalStorage("cart") || []);
    // if(isLoading){
    //     return <CartSkeleton/>
    // }
    return (
       <div className='w-full container no-padding text-black'>
         <div className='md:pb-10 pb-5 md:pt-10 pt-5 container'>
            <div className="md:p-4  mb-6 bg-white rounded-md shadow-md border">
                <div className="flex items-center justify-between p-3 border-b">
                    <h1 className="sm:text-2xl text-xl font-bold">CART</h1>
                    <p className="text-gray-600 sm:text-base text-sm">{moment().format('LL')}</p>
                </div> 
            </div>
            {
                data?.length === 0 ? (
                    <EmptyPage
                        img={<ShoppingCart className="w-full text-gray-400" />}
                        title={'Your cart is empty!'}
                        subTitle={'Looks like you haven’t added anything to your cart yet.'}
                    />
                ) : (
                    <div className="justify-between gap-5 mx-auto xl:flex">
                        <CartProduct setData={setData} data={data} />
                        <CartQuantity data={data} />
                    </div>
                )
            }
         </div>
       </div>
    );
};

export default CartPage;
