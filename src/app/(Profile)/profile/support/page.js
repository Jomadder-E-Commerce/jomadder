"use client"
import {useGetUserSupportQuery } from '@/components/Redux/services/support/supportApi';
import UserSupport from '@/components/shared/dashboard/support/userSupport/UserSupport';
import React from 'react';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";
const Support = () => {
    const {data,isLoading} = useGetUserSupportQuery()
    console.log(data?.data)
    const AllTransactionColumns = [
        { label: "User Id", key: "Id" },
        { label: "Date", key: "date" },
        { label: "Status", key: "status", type: "button" },
        { label: "Details", key: "details", type: "button" },
      ];
    return (
    <AuthUserPageWrapper>
          <div>
            <UserSupport allTransactionColumns={AllTransactionColumns} title={'All Support'} filterOptions={['all status', 'pending', 'approved', 'processing', 'rejected']} loading={isLoading} data={data?.data} />
        </div>
    </AuthUserPageWrapper>
      
    );
};

export default Support;