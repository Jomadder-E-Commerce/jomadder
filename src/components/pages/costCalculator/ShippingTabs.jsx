"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ShippingTabs({
  activeTab,
  setActiveTab,
  tabData,
  formData,
  handleInputChange,
  handleSubmit,
  cost,
  loading,
  pricePerKg
}) {
  return (
    <div className="w-full">
      <div className="sm:flex grid grid-cols-2 gap-1 rounded-xl bg-blue-900/20 p-1">
        {Object.keys(tabData).map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={`            flex-1 rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50

              ${
                activeTab === tabName
                              ? "bg-white text-blue-600 shadow-lg "
                : "bg-transparent text-gray-600 hover:bg-white/50 hover:text-blue-500"
              }
              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`}
          >
            <div className="flex items-center justify-center">
              {tabData[tabName].icon}
              {tabName}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2 rounded-xl bg-white md:p-3 p-1">
        <h3 className="text-sm font-medium leading-5 mb-2">
          {tabData[activeTab].title}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          {tabData[activeTab].description}
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {tabData[activeTab].fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                  <Select
                  value={formData[activeTab]?.[field.name] || ""} 
                  onValueChange={(value) => handleInputChange(field.name, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.name === "weight" ? "number" : field.type}
                  id={field.name}
                  name={field.name}
                  min={field.name === "weight" ? 0 : undefined}
                  placeholder="Give weight"
                  className="placeholder:text-black"
                  value={
                    field.readonly
                      ? field.defaultValue
                      : formData[activeTab]?.[field.name] || ""
                  }
                  onChange={(e) =>
                    !field.readonly &&
                    handleInputChange(e.target.name, e.target.value)
                  }
                  readOnly={field.readonly}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="">
            Calculate Cost
          </Button>
        </form>
        <div className="mt-7 p-4 bg-primary/10 rounded-md">
          <h3 className="text-lg font-semibold">Estimated Cost</h3>
         {loading ? <p>Calculating...</p> : <p className="text-2xl font-bold">৳{cost} <span className="font-semibold text-base">{pricePerKg ? `(৳${pricePerKg} per kg)` : ''}</span></p>}
        </div>
      </div>
    </div>
  );
}
