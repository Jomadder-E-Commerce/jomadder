import LoginForm from '@/components/pages/form/LoginForm';
import ProtectedPageWrapper from '@/hooks/ProtectedPageWrapper';
import React from 'react';

const page = () => {
    return (
        <div>
             {/* <ProtectedPageWrapper> */}
             <LoginForm />
             {/* </ProtectedPageWrapper> */}
            
        </div>
    );
};

export default page;