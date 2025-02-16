import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  useDeleteCategoriesMutation,
  usePatchCategoriesMutation,
} from "../Redux/services/categoriesApi/categoriesApi";
import { Card, CardContent } from "../ui/card";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageHosting } from "../shared/Cloudinary/Cloudinary";
import CategorySkeleton from "../all-skeleton/CategorySkeleton/CategorySkeleton";
import Swal from "sweetalert2";

const Category = ({ categoryData, GetisLoading }) => {
  const [deleteCategory] = useDeleteCategoriesMutation();
  const [patchCategory, { isLoading }] = usePatchCategoriesMutation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog control

  const handleDelete = async (id) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (isConfirmed) {
        await deleteCategory({ _id: id }).unwrap();
        toast.success("Category deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete category: " + error.message);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setImageDeleted(false);
    setNewImage(null);
    setDialogOpen(true); // Open the dialog on edit click
  };

  const handleImageDelete = () => {
    setImageDeleted(true);
    setNewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImageDeleted(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedCategory = {
      _id: selectedCategory._id,
      title: formData.get("title"),
      icon: null,
    };

    if (newImage) {
      try {
        const imageUrl = await ImageHosting(newImage);
        updatedCategory.icon = imageUrl.url;
      } catch (error) {
        toast.error("Failed to upload the new image");
        return;
      }
    } else if (imageDeleted) {
      updatedCategory.icon = null;
    } else {
      updatedCategory.icon = selectedCategory.icon;
    }

    try {
      await patchCategory({
        id: selectedCategory._id,
        body: updatedCategory,
      }).unwrap();
      toast.success("Category updated successfully!");
      setSelectedCategory({
        ...selectedCategory,
        title: updatedCategory.title,
        icon: updatedCategory.icon,
      });
      setImageDeleted(false);
      setNewImage(null);
      setDialogOpen(false); // Close dialog after successful submission
    } catch (error) {
      toast.error("Update failed");
    }
  };
  if (GetisLoading) {
    return <CategorySkeleton categoryLength={categoryData?.length || 4} />;
  }

  return (
    <div className="lg:my-10 my-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categoryData?.map((item, idx) => (
          <div key={idx} className="group relative">
            <Card className="border-2 hover:border-primary transition-all duration-500">
              <CardContent className="flex flex-col items-center justify-center p-4 md:flex-col">
                <Image
                  unoptimized
                  width={120}
                  height={60}
                  className="w-[120px] h-[60px] object-contain"
                  alt={item.title}
                  src={item?.icon || "/default-image.jpg"}
                />
                <p className="mt-2 text-sm font-medium text-center">
                  {item?.title}
                </p>
              </CardContent>
            </Card>
            <div className=" flex gap-1 items-center absolute top-2 right-2">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleEditClick(item)}
                  >
                    <FaRegEdit className="h-5 w-5 text-green-500" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="relative flex items-center">
                    <DialogTitle>Edit Category</DialogTitle>
                    <button
                      onClick={() => setDialogOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-300 transition duration-300 focus:outline-none block sm:hidden absolute -right-1.5 -bottom-0"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="py-4">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative col-span-4 flex justify-center mt-2">
                          {!imageDeleted ? (
                            <div className="relative group">
                              <Image
                                unoptimized
                                width={80}
                                height={80}
                                src={
                                  newImage
                                    ? URL.createObjectURL(newImage)
                                    : selectedCategory?.icon
                                }
                                alt="Selected category image"
                                className="object-cover"
                              />
                              <button
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
                                onClick={handleImageDelete}
                                type="button"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <p className="text-gray-500">Image deleted</p>
                          )}
                        </div>
                        <div className="my-2">
                          <Label htmlFor="image" className="text-right">
                            Icon
                          </Label>
                          <Input
                            name="image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleImageChange}
                            className="mb-2"
                          />
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            name="title"
                            defaultValue={selectedCategory?.title}
                            className="mb-2"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save changes"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <button
                onClick={() => handleDelete(item?._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Trash2 className="h-5 w-5 fill-red-100 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
