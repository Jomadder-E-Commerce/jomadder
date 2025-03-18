// "use client"
import RegisterForm from '@/components/pages/form/RegisterForm';
import ProtectedPageWrapper from '@/hooks/ProtectedPageWrapper';
// import useUser from '@/hooks/useUser';

import React from 'react';

const Page = () => {

    return (
        <div>
            {/* <ProtectedPageWrapper> */}
            <RegisterForm />
            {/* </ProtectedPageWrapper> */}
        </div>
    );
};

export default Page;