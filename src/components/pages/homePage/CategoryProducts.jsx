import ProductCard from "@/components/shared/cards/ProductCard";
import SectionHeader from "@/components/shared/sectionHeader/SectionHeader";
import SkeletonCard from "@/components/shared/skeleton/SkeletonCard";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

const CategoryProducts = ({ title = "Bag", items = [] }) => {
  return (
    <div className="mb-3">
      {items?.length > 0 ? (
        <div className="flex flex-col gap-x-10 ">
          <h3 className="mb-3 sm:text-xl text-lg font-semibold text-center md:text-2xl">
            <SectionHeader text={`${title} Collection`} />
          </h3>
          <div className="grid justify-center grid-cols-2 md:gap-5 sm:gap-3 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:hidden xl:grid-cols-5 xl:hidden 2xl:grid 2xl:grid-cols-6  justify-items-center">
            {items?.map((item) => (
              <ProductCard
                key={item?.item_id}
                id={item?.item_id}
                name={item?.title}
                price={item?.price}
                image={item?.img}
              />
            ))}
          </div>

          <div className="hidden xl:grid 2xl:hidden justify-center  gap-5 grid-cols-5  justify-items-center">
            {items.slice(0,15)?.map((item) => (
              <ProductCard
                key={item?.item_id}
                id={item?.item_id}
                name={item?.title}
                price={item?.price}
                image={item?.img}
              />
            ))}
          </div>
          <div className="hidden lg:grid xl:hidden justify-center  gap-5 grid-cols-4  justify-items-center">
            {items.slice(0,16).map((item) => (
              <ProductCard
                key={item?.item_id}
                id={item?.item_id}
                name={item?.title}
                price={item?.price}
                image={item?.img}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="my-6">
          <h3 className="mb-5 sm:text-xl text-lg font-semibold text-center md:text-2xl">
            <SectionHeader text={`${title} Collection`} />
          </h3>
          <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
              {[...Array(20)].map((item, key) => (
                <SkeletonCard key={key} />
            ))}
          </div>
        </div>
      )}
      <Link
        href={`/all-product?q=${title.toLowerCase()}`}
        className="flex justify-end mt-5"
      >
        <Button className="">Load more</Button>
      </Link>
    </div>
  );
};

export default CategoryProducts;
