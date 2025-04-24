"use client";
import React, { useState } from "react";
import CartProduct from "./CartProduct";
import CartQuantity from "./CartQuantity";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { ShoppingCart } from "lucide-react";
import CartSkeleton from "@/components/all-skeleton/cartSkeleton/CartSkeleton";
import moment from "moment";
import { getDataFromLocalStorage } from "@/utils/localstorage";
import useCart from "@/hooks/useCart";

const CartPage = ({ setOpenModal }) => {
  const { cart, AddIntocart, RemoveFromcart, removeAllcart } = useCart();
  // const { data, isLoading } = useGetCartListQuery();
  // const [data, setData] = useState(getDataFromLocalStorage("cart") || []);
  // if(isLoading){
  //     return <CartSkeleton/>
  // }
  return (
    <div className="w-full container  text-black">
      <div className="   pt-5 ">
        <div className="  mb-6 bg-white rounded-md shadow-md border">
          <div className="flex items-center justify-between p-3 border-b">
            <h1 className="text-xl font-bold">CART</h1>
            <p className="text-gray-600 text-sm">{moment().format("LL")}</p>
          </div>
        </div>
        {cart?.length == 0 ? (
          <EmptyPage
            img={<ShoppingCart className="w-full text-gray-400" />}
            title={"Your cart is empty!"}
            subTitle={"Looks like you haven’t added anything to your cart yet."}
          />
        ) : (
          <div className="flex flex-col gap-4">
              <CartProduct data={cart} setOpenModal={setOpenModal} />
            <div className="">
              <CartQuantity data={cart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
