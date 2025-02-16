import Deposite from '@/components/pages/Deposite/Deposit';
import React from 'react';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
    return (
        <AuthUserPageWrapper><div>
            <Deposite/>
        </div></AuthUserPageWrapper>
        
    );
};

export default page;