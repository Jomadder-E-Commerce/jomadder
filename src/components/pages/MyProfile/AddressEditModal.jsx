import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DynamicSelect } from "@/components/ui/DynamicSelect";
import { ScrollArea } from "@/components/ui/scroll-area";
import useLocationData from "@/hooks/useDivisions";


const AddressEditModal = ({
  isOpen,
  onClose,
  data,
  handleChange,
  handleSubmit,
 onDistrictChange,
 onDivisionChange,
 divisionsData,
 onThanaChange
}) => {


  const { data: districts } = useLocationData("divisions", data.division);
  const { data: thanas } = useLocationData("district", data.district);

  console.log('district', data, districts);



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Address</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-y-auto pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Country Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country
                </Label>
                <Input
                  className="w-full"
                  value="Bangladesh" // Default value
                  placeholder="Select Country"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="division" className="text-sm font-medium">
                  Division
                </Label>
                <DynamicSelect
                  className="w-full"
                  options={districts?.map((div) => div?.division)}
                  value={data?.division}
                  placeholder="Select Division"
                  onValueChange={(value) => {
                    onDivisionChange(value);
                  }}
                />
              </div>
              {/* State Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="district" className="text-sm font-medium">
                  District
                </Label>
                <DynamicSelect
                  className="w-full"
                  options={districts?.map((state) => state.district)}
                  value={data?.district}
                  placeholder="Select State"
                  onValueChange={(value) => {onDistrictChange(value);}}
                />
              </div>

              {/* City Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City
                </Label>
                  <Input
                  id="city"
                  value={data.city}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter city name"
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="postCode" className="text-sm font-medium">
                  Postal Code
                </Label>
                <Input
                  id="postCode"
                  value={data.postCode}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your postal code"
                />
              </div>
              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  value={data.address}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressEditModal;
