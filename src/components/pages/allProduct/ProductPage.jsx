"use client";
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import AllProducts from './AllProducts';

// Wrap the component using useSearchParams in Suspense
const ProductContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("q");

  return (
    <div>
      {category && <AllProducts categories={category} />}
    </div>
  );
};

const ProductPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
};

export default ProductPage;