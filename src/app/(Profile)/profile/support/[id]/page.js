import SupportDialog from '@/components/shared/dashboard/support/SupportDialog';
import Support from '@/components/shared/dashboard/support/supportDetails/Support';
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";

const page = () => {

    return (
        <div>
            <AuthUserPageWrapper>
            <Support/>

            </AuthUserPageWrapper>
        </div>
    );
};

export default page;