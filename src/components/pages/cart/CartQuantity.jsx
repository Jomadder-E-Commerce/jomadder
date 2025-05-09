import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getLocalStorage } from '@/components/shared/LocalStorage/LocalStorage';
import { toast } from 'react-toastify';
import { saveDataIntoLocalStorage } from '@/utils/localstorage';
import useCart from '@/hooks/useCart';

const CartQuantity = () => {
    const {cart, AddIntocart, RemoveFromcart, removeAllcart,UpdateCartQuantity} = useCart()
    const calculateTotal = () => {
        let totalPrice = 0;
        cart?.forEach(product => {
            if (product.checked) {
                product.skus.forEach(sku => {
                    totalPrice += sku.quantity * parseFloat(sku.price);
                });
            }
        });
        return totalPrice;
    };
    const totalPrice =  calculateTotal() 
     const SendCheckoutPage = async() => {
        const token = getLocalStorage("token");
        // console.log("redirect", window.location.pathname)
        saveDataIntoLocalStorage("redirect", window.location.pathname);
        if (!token) {
          toast.info("Please login to order");
          window.location.href = "/login";
       return
        }
        else{
            window.location.href = `/checkout`;
        }
       
     }
    return (
        <div className='w-full  h-full  '>
            <div className='w-full p-2 bg-white border rounded-md shadow-md'>
                <h1 className='pb-2 text-xl text-center border-b'>Cart Summary</h1>
                <div className='flex justify-between py-3'>
                    <p>Product Price</p>
                    <p>৳{totalPrice.toFixed(2)}</p>
                </div>
                <div className='w-full h-16 p-2 my-2 bg-gray-300 rounded-md  text-center'>
                    <p>Pay on delivery</p>
                    <p>৳ Freight + Tax cost</p>
                </div>
                {totalPrice > 0 ? (
                    <div onClick={SendCheckoutPage} >
                        <Button className='w-full p-2'>Go to CheckOut</Button>
                    </div>
                ) : (
                    <Button className='w-full p-2' disabled>
                        Go to CheckOut
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CartQuantity;
