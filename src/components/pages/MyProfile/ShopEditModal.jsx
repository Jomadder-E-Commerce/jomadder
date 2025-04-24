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

import useGetDistrict from "@/hooks/useGetDistrict";

const ShopEditModal = ({
  isOpen,
  onClose,
  data,
  handleChange,
  handleSubmit,
  onShopDivisionChange,
  onShopDistrictChange,
  onShopThanaChange,
  divisionsData
}) => {


  const {
    allDivisions,
    getDistrictsByDivision,
    allDistricts,
    needDistricts
  }  = useGetDistrict();
  // console.log(allDivisions)
  useEffect(()=>{
    if(data.division){
      const id = allDivisions?.find((div) => div?.name === data?.shopDivision)?.id;
      getDistrictsByDivision(id);
    }
    },[data?.shopDivision])
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Shop Address</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-y-auto pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* shop Name */}
              <div className="space-y-2 md:col-span-2 col-span-1">
                <Label htmlFor="name" className="text-sm font-medium">
                  Shop Name
                </Label>
                <Input
                id="shopName"
                  className="w-full"
                  value={data?.shopName}
                  placeholder="Enter Shop name"
                  onChange={handleChange}
                />
              </div>
              {/* Country Field */}
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
                <Label htmlFor="shopDivision" className="text-sm font-medium">
                  Shop Division
                </Label>
                <DynamicSelect
                  className="w-full"
                  options={allDivisions?.map((div) => div?.name)}
                  value={data?.shopDivision}
                  placeholder="Select Division"
                  onValueChange={(value) => {
                    onShopDivisionChange(value);
                    const id = allDivisions?.find((div) => div?.name === value)?.id;
                    getDistrictsByDivision(id);
                  }}

                />

              </div>


              {/* District Selector */}
              <div className="space-y-2">
                <Label htmlFor="shopDistrict" className="text-sm font-medium">
                  Shop District
                </Label>
                <DynamicSelect
                  className="w-full"
                  options={needDistricts?.map((state) => state.name)}
                  value={data?.shopDistrict}
                  placeholder="Select District"
                  onValueChange={(value) => {
                    onShopDistrictChange(value);
                  }}
                  disabled={!data.shopDivision}
                />
              </div>

              {/* Thana/City Selector */}
              <div className="space-y-2">
                <Label htmlFor="shopCity" className="text-sm font-medium">
                  Thana
                </Label>
                {/* <DynamicSelect
                  className="w-full"
                  options={thanas?.map(thana => thana)}
                  value={data?.shopCity}
                  placeholder="Select City"
                  onValueChange={(value) => {
                    onShopThanaChange(value);
                  }}
                  disabled={!data.shopDistrict}
                /> */}
                <Input
                  id="shopCity"
                  value={data.shopCity}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter shop city name"
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="shopCode" className="text-sm font-medium">
                  Shop Postal Code
                </Label>
                <Input
                  id="shopCode"
                  value={data.shopCode}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter postal code"
                />
              </div>


              {/* Address */}
              <div className="space-y-2  md:col-span-2">
                <Label htmlFor="shopAddress" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="shopAddress"
                  value={data.shopAddress}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter shop address"
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

export default ShopEditModal;