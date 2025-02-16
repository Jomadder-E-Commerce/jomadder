import MyOrders from "@/components/shared/dashboard/dashboardOrders/MyOrders";
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
  return (
    <AuthUserPageWrapper><div>
        <MyOrders />
    </div></AuthUserPageWrapper>
    
  );
};

export default page;
