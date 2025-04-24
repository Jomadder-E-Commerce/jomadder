import { useGetSingleProductChinessQuery, useGetSingleProductQuery } from '@/components/Redux/services/productApi/productApi';
import React from 'react';
import ShopDetails from './ShopDetails';
import ShopSkeleton from './ShopSkeleton';

const ShopDetailsForDetails = ({id}) => {
   const { data } = useGetSingleProductChinessQuery(id);
//    console.log(data?.data)
    return (
        <div>
            {
                data?.data?.shop_info?.seller_member_id ? <ShopDetails  id={data?.data?.shop_info?.seller_member_id}/>: <ShopSkeleton/>
            }
            
        </div>
    );
};

export default ShopDetailsForDetails;