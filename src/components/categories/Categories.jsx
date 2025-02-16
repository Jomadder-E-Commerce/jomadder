"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { convertValuesToLowerCase } from "@/utils/convert";
import Category from "./Category";
import {
  useGetCategoriesQuery,
  usePostCategoriesMutation,
} from "../Redux/services/categoriesApi/categoriesApi";
import { ImageHosting } from "../shared/Cloudinary/Cloudinary";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";
import { Button } from "../ui/button";

const Categories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [postCategories, { isLoading }] = usePostCategoriesMutation();
  const { data, isError, isLoading: GetisLoading } = useGetCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = e.target.image.files[0];
    const title = e.target.name.value;

    try {
      const imageData = await ImageHosting(image);
      console.log(imageData);
      const categoryData = {
        title,
        icon: imageData.url,
      };
      console.log("data", categoryData);
      const convertData = convertValuesToLowerCase(categoryData);
      await postCategories(convertData).unwrap();
      toast.success("Category created successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error uploading category:", error);
      toast.error("Error creating category.");
    }
  };

  return (
    <div className="mx-5">
      <h1 className="md:mt-10 mt-5 text-xl font-semibold">All Categories</h1>
      {/* Render Category Component */}
      <Category GetisLoading={GetisLoading} categoryData={data?.data} />

      <button
        onClick={() => setShowAddCategory((prev) => !prev)}
        className="flex items-center text-primary py-2 mt-4 gap-1"
      >
        {!showAddCategory && <GoPlus />}
        {showAddCategory ? "Cancel" : "Add Category"}
      </button>

      {showAddCategory && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex md:flex-row flex-col gap-2 w-full mb-4">
            <div className="md:w-1/2 w-full">
              <Label>Categories Title</Label>
              <Input
                name="name"
                type="text"
                className="h-[43px] mt-2"
                placeholder="Categories title"
                required
              />
            </div>
            <div className="md:w-1/2 w-full">
              <Label>Categories Image</Label>
              <Input
                name="image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                className="mt-2"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="p-2 w-full text-center cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Categories;
