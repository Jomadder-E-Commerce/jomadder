'use client'
import { useGetProductsByShopQuery } from "@/components/Redux/services/productApi/productApi";
import ProductCard from "@/components/shared/cards/ProductCard";

const ShopProducts = ({id}) => {
    const { data } = useGetProductsByShopQuery(id);
    const products = data?.data?.data?.items;
  return (
    <div className="container">
      <p className="text-2xl font-semibold mt-12">Shop Related Products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-6 gap-5">
        {products?.map((item, index) => (
          <div key={index} className="">
            <ProductCard
              name={item?.title}
              price={item?.price}
              image={item?.img}
              id={item?.item_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopProducts;
