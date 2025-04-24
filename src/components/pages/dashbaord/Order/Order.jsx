"use client"
import { useGetcheckoutQuery } from '@/components/Redux/services/checkout/checkoutAPi';
import DashboardView from '@/components/shared/dashboard/dashboardView/DashboardView';

const Order = () => {
    const {data}=useGetcheckoutQuery()
    // console.log(data?.data);
    return (
        <div>
            <DashboardView data={data?.data} title={'My Orders'} tab={true}/>
        </div>
    );
};

export default Order;