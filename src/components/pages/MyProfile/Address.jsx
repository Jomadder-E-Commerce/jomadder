import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2 } from 'lucide-react';
import AddressEditModal from "./AddressEditModal";
import AddressField from "./AddressField";

const Address = ({
  data,
  userAddress,
  edit,
  handleChange,
  handleSubmit,
  loading,
  onDistrictChange,
  onDivisionChange,
  divisionsData,
  onThanaChange,
  type,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Address</CardTitle>
        {edit && (
          <Button variant="outline" size="icon" onClick={openModal}>
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pt-2 pb-5">
          <AddressField label="Country" value="Bangladesh" loading={loading} />
          <AddressField label="Division" value={userAddress?.division} loading={loading} />
          <AddressField label="District" value={userAddress?.district} loading={loading} />
          <AddressField label="City" value={userAddress?.city} loading={loading} />
          <AddressField label="Postal Code" value={userAddress?.postCode} loading={loading} />
          <AddressField label="Address" value={userAddress?.address} loading={loading} />
        </div>
      </CardContent>
      <AddressEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        handleChange={handleChange}
        handleSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          closeModal();
        }}
        onDistrictChange={onDistrictChange}
        onDivisionChange={onDivisionChange}
        onThanaChange={onThanaChange}
        divisionsData={divisionsData}
      />
    </Card>
  );
};



export default Address;

