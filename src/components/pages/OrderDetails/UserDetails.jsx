import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, User, Mail, FileText, Truck, Package } from 'lucide-react';

const UserDetails = ({ orderDetails }) => {
    const { 
      orderNumber, 
      orderDate, 
      name, 
      email, 
      phone, 
      address, 
      division, 
      district, 
      city, 
      postCode, 
      country,
      orderNote ,
      OrderPhone,
      shippingAddress,
      orderName,
      orderEmail
    } = orderDetails || {};
  
    const DetailItem = ({ icon, label, value }) => (
      <div className="flex items-center space-x-3 py-2">
        {React.cloneElement(icon, { className: "h-5 w-5 text-muted-foreground flex-shrink-0" })}
        <div className="flex-grow">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold">{value || 'N/A'}</p>
        </div>
      </div>
    );
  
    return (
      <Card className="w-full ">
        <CardHeader className="pb-2">
        <h1 className="font-semibold text-xl text-slate-700 flex gap-2 items-center">
            <Truck className="h-5 w-5 text-primary" />
            <span>Shipping Details</span>
          </h1>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex sm:flex-row flex-col items-start gap-4">
            <div className="flex-1">
              <h3 className="text-md font-semibold mb-2 flex items-center space-x-2">
                <User className="h-4 w-4 text-primary" />
                <span>Customer Information</span>
              </h3>
              <DetailItem icon={<User />} label="Name" value={orderName} />
              <DetailItem icon={<Mail />} label="Email" value={orderEmail} />
              <DetailItem icon={<Phone />} label="Phone" value={OrderPhone} />
              <DetailItem icon={<FileText />} label="Note" value={orderNote || 'No order note provided.'} />
            </div>

            <div className="flex-1">
              <h3 className="text-md font-semibold mb-2 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Shipping Address</span>
              </h3>
              <DetailItem icon={<MapPin />} label="District" value={`${division || ","} ${district}`} />
              <DetailItem icon={<MapPin />} label="Thana" value={city} />
              <DetailItem icon={<MapPin />} label="Address" value={shippingAddress} />
              <DetailItem icon={<MapPin />} label="Post Code" value={postCode} />
            </div>
{/*  */}
            
          </div>
          {/* <div>
              <h3 className="text-md font-semibold mb-2 flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>Order Note</span>
              </h3>
              <p className="text-sm">{orderNote || 'No order note provided.'}</p>
            </div> */}
        </CardContent>
      </Card>
    );
  };

export default UserDetails;