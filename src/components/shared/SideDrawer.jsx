import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Drawer from "react-modern-drawer";

// Import styles 👇
import "react-modern-drawer/dist/index.css";
import { categories } from "@/lib/sidebarData";
import Search from "./search/Search";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {/* Drawer Toggle Icon */}
      <FiAlignJustify
        className="md:text-2xl text-lg cursor-pointer"
        onClick={toggleDrawer}
      />

      {/* Drawer Component */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="custom-drawer overflow-auto"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold">Jomadder</h1>
          <RxCross1
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Drawer Search Bar (Mobile Only) */}
        <div className="md:hidden px-4 py-2">
          <Search />
        </div>

        {/* Tabs for Menu and Categories */}
        <Tabs defaultValue="categories">
          <TabsList className="grid w-full grid-cols-2 gap-2 px-4">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu">
            <CardContent className="space-y-4 px-4 cursor-pointer text-gray-800">
              {/* <Link href="/" className="block hover:underline">
                Blog
              </Link> */}
              <Link href="/contact-us" className="block hover:underline">
                Contact Us
              </Link>
            </CardContent>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <CardContent className="cursor-pointer">
              {selectedCategory === null ? (
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category.name}
                      className="py-2 hover:bg-gray-100 rounded-md text-gray-800"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div className="flex justify-between items-center px-4">
                        <div className="flex gap-2 items-center">
                          <Image
                            src={category.icon}
                            alt={category.name}
                            width={24}
                            height={24}
                          />
                          <span className="text-gray-800">{category.name}</span>
                        </div>
                        <MdKeyboardArrowRight className="text-xl" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  {/* Subcategories */}
                  <div className="flex items-center gap-2 mb-2 px-4">
                    <button onClick={() => setSelectedCategory(null)}>
                      <IoIosArrowRoundBack className="text-xl text-gray-800" />
                    </button>
                    <h3 className="font-semibold text-gray-800">
                      {selectedCategory}
                    </h3>
                  </div>
                  <hr className="mb-2" />
                  <ul>
                    {categories
                      .find((cat) => cat.name === selectedCategory)
                      ?.subcategories.map((subcategory, index) => (
                        <li
                          key={index}
                          className="py-2 hover:bg-gray-100 rounded-md text-gray-800"
                        >
                          <Link
                            href={`/all-product?q=${subcategory.replace(
                              /\s+/g,
                              "-"
                            )}`}
                            className="flex justify-between items-center px-4"
                          >
                            <span>{subcategory}</span>
                            <MdKeyboardArrowRight className="text-xl" />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
