import { DynamicSelect } from "@/components/ui/DynamicSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AccountHeader from "./AccountHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShopInfo = ({
  data,
  userShop,
  edit,
  editMode,
  setEditMode,
  handleChange,
  handleSubmit,
  loading,
  onShopDistrictChange,
  onShopDivisionChange,
  onShopThanaChange,
  divisionsData,
  type,
}) => {
  const shopDivision = divisionsData.find(
    (div) => div.division === data.shopDivision
  );
  const shopDistricts = shopDivision?.districts || [];
  const shopThanas = shopDistricts.flatMap((district) =>
    district.policeStations
      ? district.policeStations.map((station) => station)
      : []
  );
  console.log(userShop);
  return (
    <div>
      {edit && (
        <section className=" border border-slate-200 md:p-5 p-2 rounded-2xl my-4">
          <AccountHeader
            type={type}
            title={"Shop Info"}
            edit={edit}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 md:gap-8 gap-3 my-4 rounded-xl"
          >
            {loading ? (
              <Skeleton className="h-8 w-full mt-2" />
            ) : (
              <div>
                <Label
                  htmlFor="country"
                  className="font-semibold text-gray-500"
                >
                  Country
                </Label>
                {editMode ? (
                  <Input
                    className="mt-2"
                    id="country"
                    value={"Bangladesh"}
                    onChange={handleChange}
                    readOnly
                  />
                ) : (
                  <p className="mt-2 text-gray-700 border-b pb-1">Bangladesh</p>
                )}
              </div>
            )}

            {loading ? (
              <Skeleton className="h-8 w-full mt-2" />
            ) : data.shopDivision || editMode ? (
              <div>
                <Label
                  htmlFor="shopDivision"
                  className="font-semibold text-gray-500"
                >
                  Division
                </Label>
                {editMode ? (
                  <DynamicSelect
                    className="mt-1.5 h-[38px]"
                    options={divisionsData.map((div) => div.division)}
                    name="shopDivision"
                    placeholder={data.shopDivision || "Select Division"}
                    onValueChange={(value) => onShopDivisionChange(value)}
                    value={data.shopDivision}
                  />
                ) : (
                  <p className="mt-2 text-gray-700 border-b pb-1">
                    {userShop.division || "---"}
                  </p>
                )}
              </div>
            ) : null}

            {loading ? (
              <Skeleton className="h-8 w-full mt-2" />
            ) : data.shopDistrict || editMode ? (
              <div>
                <Label
                  htmlFor="shopDistrict"
                  className="font-semibold text-gray-500"
                >
                  District
                </Label>
                {editMode ? (
                  shopDivision ? (
                    <Select onValueChange={onShopDistrictChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {shopDistricts.map((district) => (
                            <SelectItem
                              key={district.district}
                              value={district.district}
                            >
                              {district.district}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      className="mt-2"
                      id="shopDistrict"
                      value={data.shopDistrict || ""}
                      readOnly
                    />
                  )
                ) : (
                  <p className="mt-2 text-gray-700 border-b pb-1">
                    {userShop.district || "---"}
                  </p>
                )}
              </div>
            ) : null}

            {loading ? (
              <Skeleton className="h-8 w-full mt-2" />
            ) : data.shopCity || editMode ? (
              <div>
                <Label
                  htmlFor="shopCity"
                  className="font-semibold text-gray-500"
                >
                  Thana
                </Label>
                {editMode ? (
                  shopDivision && shopDistricts ? (
                    <Select onValueChange={onShopThanaChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Thana" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {shopThanas.map((thana) => (
                            <SelectItem key={thana} value={thana}>
                              {thana}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      className="mt-2"
                      id="shopCity"
                      value={data.shopCity || ""}
                      readOnly
                    />
                  )
                ) : (
                  <p className="mt-2 text-gray-700 border-b pb-1">
                    {userShop.city || "---"}
                  </p>
                )}
              </div>
            ) : null}

            {loading ? (
              <Skeleton className="h-8 w-full mt-2" />
            ) : data.shopCode || editMode ? (
              <div>
                <Label
                  htmlFor="shopCode"
                  className="font-semibold text-gray-500"
                >
                  Postal Code
                </Label>
                {editMode ? (
                  <Input
                    className="mt-2"
                    id="shopCode"
                    value={data?.shopCode}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="mt-2 text-gray-700 border-b pb-1">
                    {userShop.postCode || "---"}
                  </p>
                )}
              </div>
            ) : null}

            {loading ? (
              <Skeleton className="h-8 w-full mt-2" />
            ) : data.shopAddress || editMode ? (
              <div>
                <Label
                  htmlFor="shopAddress"
                  className="font-semibold text-gray-500"
                >
                  Shop Address
                </Label>
                {editMode ? (
                  <Input
                    className="mt-2"
                    id="shopAddress"
                    value={data?.shopAddress}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="mt-2 text-gray-700 border-b pb-1">
                    {userShop.address || "---"}
                  </p>
                )}
              </div>
            ) : null}

            <div></div>
            {editMode && !loading && (
              <div className="mt-4">
                <button
                  type="submit"
                  className="text-white bg-primary rounded-md py-1.5 w-full"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </section>
      )}
    </div>
  );
};

export default ShopInfo;
