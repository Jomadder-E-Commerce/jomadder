import Dashbaordpage from '@/components/pages/dashbaord/Dashbaordpage';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {
    return (
        <AuthUserPageWrapper><Dashbaordpage/></AuthUserPageWrapper>
           
    );
};

export default page;