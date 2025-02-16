import CheckOutPage from '@/components/pages/checkout/CheckOutPage';
import React from 'react';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
    return (
        <AuthUserPageWrapper><div className='overflow-hidden'>
            <CheckOutPage />
        </div></AuthUserPageWrapper>
        
    );
};

export default page;