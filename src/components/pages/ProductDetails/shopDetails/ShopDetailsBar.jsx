"use client"
import { useGetShopInfoQuery } from '@/components/Redux/services/productApi/productApi';
import { CheckCircle, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';

const ShopDetailsBar = ({ id }) => {
  const { data, isLoading } = useGetShopInfoQuery(id);
  const shop = data?.data?.data;
  const [rating, setRating] = useState(0)



  const shopInfo = {
    companyName: shop?.company_name || "",
    shopName: shop?.shop_name || "",
    location: shop?.location_str || "",
    authentication: shop?.authentication || "",
    ratingsItem: shop?.shop_ratings || [],
    shopTags: shop?.shop_tag || [],
  };

  const translatedShopName = shopInfo?.companyName;
  const translatedShopLocation = shopInfo?.location;



  return (
    <div className="flex items-center justify-between p-4 bg-sky-50 mb-3 shadow-md rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <Link href={`/shop-products/${shop?.member_id}`}>
            <h2 className="sm:text-lg text-sm font-semibold text-gray-800">{translatedShopName}</h2>
          </Link>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{translatedShopLocation}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-medium text-gray-700">{shopInfo?.ratingsItem[1]?.score}</span>
        </div>
        {shopInfo?.authentication && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Verified</span>
          </div>
        )}
      </div>
    </div>

  );
};

export default ShopDetailsBar;