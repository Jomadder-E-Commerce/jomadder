import PaymentPage from '@/components/PaymentPage/PaymentPage';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
    return (
        <AuthUserPageWrapper><div>
            <PaymentPage/>
        </div></AuthUserPageWrapper>
        
    );
};

export default page;