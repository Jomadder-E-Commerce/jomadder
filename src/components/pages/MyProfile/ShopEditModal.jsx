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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Country, State, City } from "country-state-city";

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
    const Division = divisionsData.find(
        (div) => div.division === data.shopDivision
      );
      const Districts = Division?.districts || [];
      const thanas = Districts.flatMap((district) =>
        district.policeStations
          ? district.policeStations.map((station) => station)
          : []
      );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Address</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-y-auto pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="shopDivision" className="text-sm font-medium">
                       Shop Division
                      </Label>
                      <DynamicSelect
                        className="w-full"
                        options={divisionsData.map((div) => div.division)}
                        value={data?.shopDivision}
                        placeholder="Select Division"
                        onValueChange={(value) => {
                          onShopDivisionChange(value);
                        }}
                      />
                    </div>

              {/* State Dropdown */}
                 <div className="space-y-2">
                             <Label htmlFor="shopDistrict" className="text-sm font-medium">
                               Shop District
                             </Label>
                             <DynamicSelect
                               className="w-full"
                               options={Districts.map((state) => state.district)}
                               value={data?.shopDistrict}
                               placeholder="Select district"
                               onValueChange={(value) => {onShopDistrictChange(value);}}
                             />
                           </div>

              {/* City Dropdown */}
     <div className="space-y-2">
                <Label htmlFor="shopCity" className="text-sm font-medium">
                  City
                </Label>
                <DynamicSelect
                  className="w-full"
                  id="shopCity"
                  options={thanas.map((state) => state)}
                  onValueChange={(value)=>{onShopThanaChange(value)}}
                  value={data?.shopCity}
                  placeholder="Enter your city"
                />
              </div>
              {/* Postal Code */}
              <div className="space-y-2">
                <Label htmlFor="shopCode" className="text-sm font-medium">
                  Shop Postal Code
                </Label>
                <Input
                  id="shopCode"
                  value={data.shopCode}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your postal code"
                />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="shopAddress" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="shopAddress"
                  value={data.shopAddress}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your shop address"
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


export default ShopEditModal;