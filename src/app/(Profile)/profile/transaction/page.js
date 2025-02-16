
import Transactions from "@/components/shared/dashboard/dashboardTransaction/Transactions";
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";
import React from "react";

const page = () => {
  return (
    <AuthUserPageWrapper>
        <Transactions />
    </AuthUserPageWrapper>
  );
};

export default page;
