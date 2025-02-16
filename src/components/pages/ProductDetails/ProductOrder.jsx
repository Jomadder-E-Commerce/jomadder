import React from "react";
import { IoCartOutline } from "react-icons/io5";

const ProductOrder = ({ data, CompleteTheAddtoCart, handleBuyNow }) => {
  return (
    <div className="flex flex-col flex-wrap items-start justify-start py-4 px-4 gap-3 lg:items-center">
      <button
        onClick={CompleteTheAddtoCart}
        type="submit"
        name="action"
        value="addToCart"
        // disabled={count < 1}
        className="flex items-center justify-center gap-4 px-4 py-2 hover:bg-gray-100 bg-transparent border rounded-lg border-primary w-full text-primary"
      >
        <IoCartOutline className="text-lg" /> Add to cart
      </button>
      <div className="w-full flex gap-3">
        <button
          onClick={handleBuyNow}
          type="submit"
          name="action"
          value="buyNow"
          className="flex justify-center items-center hover:bg-primary bg-primary text-white rounded-lg gap-2 px-[40px] py-3 text-sm w-full "
        >
          Buy Now
        </button>

        {/* <WishlistButton
            productId={data?.item_id}
            productTitle={data?.title}
            productImage={data?.main_imgs[0]}
            price={data?.price_info?.price}
          /> */}
      </div>
    </div>
  );
};

export default ProductOrder;
