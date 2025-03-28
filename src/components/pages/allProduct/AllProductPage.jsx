"use client"
import AllproductSkeleton from "@/components/all-skeleton/ProductSkeleton/AllproductSkeleton";
import ProductCard from "@/components/shared/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllProductPage = ({
  handlePageChange,
  products,
  handleFilterSubmit,
  minPriceRef,
  maxPriceRef,
  isLoading,
  currentPage,
  sort,
  handleSortChange,
  categories
}) => {
  const decodedString = decodeURIComponent(categories);
  return (
    <div className="flex flex-col w-full gap-3 mx-auto mb-5">
      {/* Filter Section */}
      <form
        onSubmit={handleFilterSubmit}
        className="flex flex-col items-center justify-between p-2 border rounded-md bg-secondary sm:flex-row gap-y-2"
      >
        <p className="w-full text-center text-semibold sm:text-start">
          SHOWING RESULTS FOR {decodedString.toUpperCase()}
        </p>
        <div className="flex lg:flex-nowrap flex-wrap items-center justify-between gap-2 sm:justify-end">
          <div className="flex flex-col w-full sm:w-auto">
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Sort Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-to-high">Low to High</SelectItem>
                <SelectItem value="high-to-low">High to Low</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                placeholder="Min Price"
                type="text"
                ref={minPriceRef}
                className="w-full py-2 sm:px-2 sm:w-24 px-2"
              />
              <span className="text-sm text-muted-foreground">-</span>
              <Input
                placeholder="Max Price"
                type="text"
                ref={maxPriceRef}
                className="w-full py-2 sm:px-2 sm:w-24 px-2"
              />
            </div>

            <Button type="submit" className="md:w-full sm:w-auto h-9 sm:text-base text-sm px-2 w-min">
              Filter
            </Button>

          </div>

        </div>

      </form>

      {/* Product List */}
      {isLoading ? (
        <AllproductSkeleton />
      ) : products?.length === 0 ? (
        <div className="text-red-500 flex justify-center items-center h-[320px]">
          No products found. Please try again.
        </div>
      ) : (
        <div className="grid items-start justify-between w-full grid-cols-2 gap-3 justify-items-center lg:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5 xs:grid-cols-2 min-h-[320px]">
          {products?.map((product) => (
            <ProductCard
              key={product?.item_id}
              id={product?.item_id}
              name={product?.title}
              price={product?.price}
              image={product?.img}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${currentPage === 1 ? "bg-gray-200" : "bg-white"
            }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-white border rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProductPage;
