import OrderDetails from "@/components/pages/OrderDetails/OrderDetails";
import AuthUserPageWrapper from "@/hooks/AuthUserPageWrapper";


const page = ({params}) => {
    const {id} = params
    return (
        <AuthUserPageWrapper><div>
            
            <OrderDetails id={id}/>
        </div></AuthUserPageWrapper>
        
    );
};

export default page;