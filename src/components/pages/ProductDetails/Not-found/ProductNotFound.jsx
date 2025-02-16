import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ProductNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center py-4 px-2 text-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur opacity-25"></div>
            <div className="relative bg-white md:p-4 sm:p-3 p-2 rounded-full">
              <Package className="md:w-12 sm:w-10 w-8 md:h-12 sm:h-10 h-8 text-primary" />
            </div>
          </div>
          <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-gray-900">Supplier is not verified</h1>
        </div>

        <p className="md:text-xl sm:text-lg text-base text-gray-600">
          We&apos;re sorry, but the product you&apos;re looking that product supplier is not verified. The product may be  
          unavailable or may not meet our quality standards.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-center gap-3  flex-col">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-yellow-800">Supplier Verification in Progress</h2>
            <p className="text-yellow-700">
              We&apos;re in the process of verifying this supplier to ensure the highest quality standards for our customers.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Our team is working diligently to bring you an extensive range of products. We appreciate your patience and
            invite you to explore our available items.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Explore Available Products
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you have any questions or need assistance, please don&apos;t hesitate to contact our customer support team.
          </p>
        </div>
      </div>
    </div>
    );
};

export default ProductNotFound;