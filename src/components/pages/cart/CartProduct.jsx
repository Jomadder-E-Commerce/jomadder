"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useDeleteCartMutation,
  useGetCartListQuery,
  useUpdateCheckboxMutation,
  useUpdateQuantityMutation,
} from "@/components/Redux/services/cartApi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductCount from "../ProductDetails/ProductCount";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import {
  getDataFromLocalStorage,
  updateLocalStorageCartQuantity,
  removeOneDataFromLocalStorage,
} from "@/utils/localstorage";
import Swal from "sweetalert2";
import Link from "next/link";
import useCart from "@/hooks/useCart";
const CartProduct = ({ data, setOpenModal }) => {
  const {
    cart,
    AddIntocart,
    RemoveFromcart,
    removeAllcart,
    UpdateCartQuantity,
  } = useCart();
  const [updateCheckbox, { isLoading: checkboxLoading }] =
    useUpdateCheckboxMutation();
  const [count, setCount] = useState(1);
  const [products, setproduct] = useState({});
  const [UpdateQuantity, { isSuccess, isLoading: updateQuantityLoading }] =
    useUpdateQuantityMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteCart, { isSuccess: DeletedSuccess, isLoading }] =
    useDeleteCartMutation();

  const handleUpdateQuantity = async (productId, sku, newQuantity) => {
    // // try {
    // //     const payload = {cartId:productId, skuId:sku, quantity:newQuantity}
    // //     console.log(payload);
    // //     const res = await UpdateQuantity(payload);
    // //     if(isSuccess){
    // //         setDialogOpen(false)
    // //     }
    // // } catch (error) {
    // //     console.error("Error updating quantity:", error);
    // // }
    // console.log(sku, newQuantity)
    try {
      // updateLocalStorageCartQuantity("cart",productId,sku, newQuantity)
      UpdateCartQuantity(productId, sku, newQuantity);
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };
  const handleDeleted = async (id) => {
    // const res = await deleteCart(id);
    // if(res.data.success){
    //     toast.success(`${res?.data?.message? "Product successfully removed from your Cart.": res?.data?.message}`)

    // }else{
    //     toast.error(`${res?.error?.data?.message? res?.error?.data?.message:"Failed Deleted to Cart."}` )
    // }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // removeOneDataFromLocalStorage("cart",id);
        RemoveFromcart(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleCheckboxChange = async (productId, checked, product) => {
    setproduct(product);
    const payload = { isChecked: checked, _id: productId };
    await updateCheckbox({ id: productId, body: payload });
    // Add or remove item based on checkbox selection
  };

  return (
    <div className="w-full  ">
      {cart?.map((product, index) => (
        <div
          className=" bg-white w-full px-6 my-4 pb-4 border-2 rounded-md shadow-md border-red-50 "
          key={product._id}
        >
          {/* <div className="pt-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center  gap-4">
                <div className="flex gap-4">
                  <input
                    key={index}
                    type="checkbox"
                    checked={product?.checked}
                    className="mt-1 w-4 h-4"
                    onChange={(e) =>
                      handleCheckboxChange(
                        product._id,
                        e.target.checked,
                        product
                      )
                    }
                  />

                  <div className="  w-full h-full  mb-1">
                    <Image
                      unoptimized
                      src={product.productImage}
                      alt="Product"
                      width={100}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <RiDeleteBin6Line
                    disable={isLoading}
                    onClick={() => handleDeleted(product?.id)}
                    className="text-xl text-red-700 bg-white cursor-pointer  block "
                  />
                </div>
                <div>
                  <Link
                    href={`/product-details/${product?.id}`}
                    className="text-sm font-semibold"
                  >
                    Order ID: #{product.id}
                  </Link>
                  <Link
                    href={`/product-details/${product?.id}`}
                    className="text-sm pr-4"
                  >
                    {product.productTitle.length > 30
                      ? product.productTitle.slice(0, 30) + "..."
                      : product.productTitle}
                  </Link>
                </div>
              </div>
            </div>
          </div> */}

          {product?.skus?.map((sku) => (
            <div className="" key={sku._id}>
              <div className="flex border-b flex-col  py-2   justify-between gap-3">
                <div className="flex justify-between">
                  <Link
                    href={`/product-details/${product?.id}`}
                    className="text-sm font-semibold"
                    onClick={() => setOpenModal(false)}
                  >
                    <div className="items-center gap-3 flex">
                      <input
                        key={index}
                        type="checkbox"
                        checked={product?.checked}
                        className="mt-1 w-4 h-4"
                        onChange={(e) =>
                          handleCheckboxChange(
                            product._id,
                            e.target.checked,
                            product
                          )
                        }
                      />
                      <Image
                        unoptimized
                        src={sku.image}
                        alt="SKU"
                        width={40}
                        height={40}
                        className="object-cover "
                      />
                      <div>
                        <div className="text-sm font-normal pr-4">
                          {product.productTitle.length > 30
                            ? product.productTitle.slice(0, 30) + "..."
                            : product.productTitle}
                        </div>
                        <p className="text-sm">
                          {sku.sku?.split(";").join(", ")}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <RiDeleteBin6Line
                    disable={isLoading}
                    onClick={() => handleDeleted(product?.id)}
                    className="text-xl text-red-700 bg-white cursor-pointer  block "
                  />
                </div>

                <div className="flex justify-between items-end">
                  <p className="text-sm">
                    {sku.quantity} * ৳{parseFloat(sku.price).toFixed(2)}
                  </p>
                  <p className=" block">
                    ৳{(sku.quantity * parseFloat(sku.price)).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {/* <p className='sm:block hidden'>৳{(sku.quantity * parseFloat(sku.price)).toFixed(2)}</p> */}
                  <Dialog className="">
                    <DialogTrigger asChild>
                      <button
                        variant="outline"
                        className="px-3 py-[5px] rounded-md bg-primary cursor-pointer text-white w-full"
                        onClick={() => setCount(sku.quantity)}
                      >
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent className=" w-full">
                      <div className=" p-1  space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Sku: {sku.sku}</p>
                          <ProductCount
                            count={count}
                            setCount={setCount}
                            stock={1000} // You can dynamically set the stock
                          />
                        </div>
                        <div className="flex gap-3 items-center">
                          <p className="bg-gray-200 px-1 py-[2px] text-sm">
                            Total Item: {count}
                          </p>
                          <p className="bg-gray-200 px-1 py-[2px] text-sm">
                            Subtotal: ৳{(count * sku.price).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <DialogClose>
                            {" "}
                            <button
                              onClick={() => handleDeleted(product?._id)}
                              className="bg-red-800 px-4 py-[4px] text-sm rounded text-white hover:bg-red-500 hover:text-white"
                            >
                              Delete
                            </button>
                          </DialogClose>
                          <div className="flex gap-2 justify-center items-center">
                            <DialogClose>
                              <button className="bg-gray-300 px-4 py-[4px] text-sm rounded">
                                Cancel
                              </button>
                            </DialogClose>
                            <DialogClose>
                              <button
                                className="bg-primary text-white px-4 py-[4px] text-sm rounded"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    product?.id,
                                    sku?.sku,
                                    count
                                  )
                                }
                              >
                                Update
                              </button>
                            </DialogClose>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-row justify-between gap-3 mt-3 text-sm">
            {/* <p>Item Details</p> */}

            <p>
              {product.skus?.reduce((acc, sku) => acc + sku.quantity, 0)} items
            </p>
            <p>
              Total : ৳
              {Math.round(
                product.skus?.reduce(
                  (acc, sku) => acc + sku.quantity * sku.price,
                  0
                )
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProduct;
