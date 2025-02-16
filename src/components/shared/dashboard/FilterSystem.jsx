'use client'
import React, { useState, useEffect } from 'react';

// Sample product data (this will come from your API)
const products = [
    { id: 1, name: 'Apple Watch Series 6', category: 'watches', price: 639 },
    { id: 2, name: 'Samsung Galaxy Watch 4', category: 'watches', price: 899 },
    { id: 3, name: 'iPhone 13', category: 'mobiles', price: 3199 },
    { id: 4, name: 'Samsung Galaxy S21', category: 'mobiles', price: 2899 },
    { id: 5, name: 'Lipstick', category: 'cosmetics', price: 50 },
    { id: 6, name: 'Jeans', category: 'pants', price: 120 },
    { id: 7, name: 'T-shirt', category: 'clothes', price: 99 }
];

// Categories for filtering
const categories = ['mobiles', 'watches', 'cosmetics', 'pants', 'clothes'];

const FilterSystem = () => {
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [filteredProducts, setFilteredProducts] = useState(products); // Filtered products state

    // Handle checkbox change
    const handleCategoryChange = (category) => {
        // Toggle category in the selectedCategories state
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category); // Remove category if already selected
            } else {
                return [...prev, category]; // Add category if not selected
            }
        });
    };

    // Effect to filter products when selectedCategories change
    useEffect(() => {
        if (selectedCategories.length === 0) {
            // Show all products if no category is selected
            setFilteredProducts(products);
        } else {
            // Filter products based on selected categories
            const filtered = products.filter((product) =>
                selectedCategories.includes(product.category)
            );
            setFilteredProducts(filtered);
        }

        // Log filtered products to console for verification
        console.log('Filtered Products:', filteredProducts);
    }, [selectedCategories]);

    return (
        <div className="p-4">
            {/* Category Filter Section */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Filter by Category</h2>
                <div className="flex flex-col mt-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <span className="capitalize">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Listing Section */}
            <div>
                <h3 className="mb-4 text-lg font-semibold">Products</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="p-4 bg-white border rounded-lg shadow-md">
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-gray-500 capitalize">Category: {product.category}</p>
                            <p className="text-red-500">Price: AED {product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSystem;
