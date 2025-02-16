import { products } from "@/data/Products";
import Image from "next/image";

const UserOrder = () => {
  return (
    <div className="p-3">
      <h2 className="text-lg md:text-xl font-semibold text-slate-700 my-4">
        Orders
      </h2>
      <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4">
        {products.slice(0, 4).map((product, index) => (
          <div
            key={index}
            className="items-center gap-5 p-4  space-y-2 bg-white border rounded-lg shadow-md flex "
          >
            <Image
              unoptimized
              src={product.image} // Dynamic product image
              alt={product.name}
              className="object-cover w-24 h-full rounded-lg"
              width={180} // Next.js Image optimization
              height={180} // Next.js Image optimization
            />

            <div>
              <div className="flex-grow">
                <h3 className="text-sm font-semibold">
                  {product.name.length > 50
                    ? product.name.slice(0, 50) + "..."
                    : product.name}
                </h3>

                {/* Pricing */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-red-500">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder;
