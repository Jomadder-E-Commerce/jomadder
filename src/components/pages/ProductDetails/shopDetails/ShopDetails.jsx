import { useGetShopInfoQuery } from "@/components/Redux/services/productApi/productApi";
import ShopProducts from "./ShopProducts";
import { Badge, MapPin, Shield, Star, Tag } from "lucide-react";
import Link from "next/link";
import ShopSkeleton from "./ShopSkeleton";

export default function ShopDetails({id }) {
  const { data ,isLoading} = useGetShopInfoQuery(id);
  const shop = data?.data?.data;

  const shopInfo = {
    companyName: shop?.company_name || "",
    shopName: shop?.shop_name || "",
    location: shop?.location_str || "",
    authentication: shop?.authentication || "",
    ratingsItem: shop?.shop_ratings || [],
    shopTags: shop?.shop_tag || [],
  };
  if(isLoading){
    return(  <ShopSkeleton/>)
  
  }
  return (
    <div className="min-h-[70vh]  text-gray-600">
      <div className="flex flex-col mx-auto py-2 md:py-4 gap-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold">{shopInfo.shopName}</h1>
          <p className="text-muted-foreground">{shopInfo.companyName}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border py-5 px-3  text-xl flex-col items-center justify-center rounded-md shadow-md">
            <div className="flex items-center justify-center text-xl font-semibold">
              <MapPin />
              Location
            </div>
            <p className="text-center mt-3">{shopInfo.location}</p>
          </div>

          <div className="border py-5 px-3  text-xl flex-col items-center justify-center rounded-md shadow-md">
            <div className="flex items-center justify-center text-xl font-semibold">
              <Shield />
              Authentication
            </div>
            <p className="text-center mt-3">
              {shopInfo.authentication
                ? shopInfo.authentication
                : "Not Verified"}
            </p>
          </div>
        </div>

        <div className="w-full mx-auto bg-gray-50 shadow-md py-5 px-3  border rounded-md">
          <h2 className="flex items-center justify-center gap-2 text-xl font-semibold mb-6">
            <Star className="h-8 w-8 text-yellow-400" />
            Shop Ratings
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {shopInfo?.ratingsItem?.map((rating, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center bg-gray-50 text-2xl font-bold mb-3`}
                >
                  {rating?.score}
                </div>
                <h3 className="font-semibold text-center">{rating?.title}</h3>
                <p className="text-sm text-gray-500 text-center mt-1 md:block hidden">
                  {rating?.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-5 px-3  border rounded-md shadow-md">
          <div>
            <div className="flex items-center text-xl justify-center font-semibold">
              <Tag />
              Shop Tags
            </div>
          </div>
          {shopInfo?.shopTags?.length > 0 ? (
            <div>
              <div className="flex flex-wrap gap-2 my-4">
                {shopInfo.shopTags.map((tag, index) => (
                  <button
                    className="border px-3 py-1 rounded-lg"
                    key={index}
                    variant="secondary"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mx-5 my-2">No Tags</p>
          )}
        </div>
      </div>

      <div className="text-center md:mt-6">
        <Link href={`/shop-products/${shop?.member_id}`}>
          <button className="px-4 py-2 bg-black my-10 text-white rounded-lg">
            Shop Products
          </button>
        </Link>
      </div>
    </div>
  );
}
