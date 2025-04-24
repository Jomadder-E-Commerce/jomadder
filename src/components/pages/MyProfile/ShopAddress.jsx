import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2 } from 'lucide-react';
import AddressField from './AddressField';
import ShopEditModal from './ShopEditModal';

const ShopAddress = ({
  type,
          data,
          userShop,
          edit,
          editMode,
          setEditMode,
          handleChange,
          handleSubmit,
          loading,
          divisionsData,
          onShopDivisionChange,
          onShopDistrictChange,
          onShopThanaChange
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    //  console.log(userShop);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    return (
      <Card className="w-full mt-5">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Shop Address</CardTitle>
          {edit && (
            <Button variant="outline" size="icon" onClick={openModal}>
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 px-5 pt-2 pb-5 md:grid-cols-2">
          <AddressField label="Shop name" value={userShop?.name} loading={loading} />
            <AddressField label="Country" value="Bangladesh" loading={loading} />
            <AddressField label="Division" value={userShop?.division} loading={loading} />
            <AddressField label="District" value={userShop?.district} loading={loading} />
            <AddressField label="Thana" value={userShop?.city} loading={loading} />
            <AddressField label="Postal Code" value={userShop?.postCode} loading={loading} />
            <AddressField label="Address" value={userShop?.address} loading={loading} />
          </div>
        </CardContent>
        <ShopEditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={data}
          handleChange={handleChange}
          handleSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            closeModal();
          }}
          onShopDivisionChange={onShopDivisionChange}
          onShopDistrictChange={onShopDistrictChange}
          onShopThanaChange={onShopThanaChange}
          divisionsData={divisionsData}
        />
      </Card>
    );
  };

export default ShopAddress;