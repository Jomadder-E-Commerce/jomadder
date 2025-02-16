import DashboardWallet from '@/components/shared/dashboard/dashboardWallet/DashboardWallet';
import React from 'react';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
    return (
        <AuthUserPageWrapper>  <div>
            <DashboardWallet/>
        </div></AuthUserPageWrapper>
      
    );
};

export default page;