import DeliveryAddress from '@/components/shared/dashboard/deliveryAddress/DeliveryAddress';
import React from 'react';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
    return (
        <AuthUserPageWrapper><div>
            <DeliveryAddress />
        </div></AuthUserPageWrapper>
        
    );
};

export default page;