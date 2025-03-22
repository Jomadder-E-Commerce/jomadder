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
import useDivisions from "@/hooks/useDivisions";
// import useLocationData from "@/hooks/useDivisions";
import useGetDivision from "@/hooks/useGetDivision";
import useGetDistrict from "@/hooks/useGetDistrict";

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


  const {
    allDivisions,
    getDistrictsByDivision,
    allDistricts,
    needDistricts
  }  = useGetDistrict();
  
  // console.log("division data",division)
  useEffect(()=>{
  if(data.division){
    const id = allDivisions?.find((div) => div?.name === data?.division)?.id;
    getDistrictsByDivision(id);
  }
  },[data.division])



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
                  options={allDivisions?.map((div) => div?.name)}
                  value={data?.division}
                  placeholder="Select Division"
                  onValueChange={(value) => {
                    onDivisionChange(value);
                     const id = allDivisions?.find((div) => div?.name === value)?.id;
                     getDistrictsByDivision(id);
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
                  options={needDistricts?.map((state) => state.name)}
                  value={data?.district}
                  placeholder="Select State"
                  onValueChange={(value) => { onDistrictChange(value); }}
                />
              </div>

              {/* City Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  Thana
                </Label>

                <Input
                  id="city"
                  value={data.city}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your Thana"
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
          <Button className="mb-3 sm:mb-0" type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressEditModal;
