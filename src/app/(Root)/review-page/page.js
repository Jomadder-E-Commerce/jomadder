import Image from 'next/image';
import Transaction from '@/assets/dashboard/transaction.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {  ArrowRight } from 'lucide-react';
import moment from 'moment';

const page = () => {

 

    return (
        <div className='container'>
            <div className="px-5 pt-5 bg-gray-100">
                <div className="p-4 mb-6 bg-white rounded-md shadow-md">
                    <div className="flex flex-col items-center justify-between pb-4 border-b sm:flex-row">
                        <h1 className="text-lg font-bold sm:text-2xl">Transaction Review</h1>
                        <p className="text-gray-600">{moment().format('ll')}</p>
                    </div> 
                </div>
                {/* Order Status */}
                <div className="p-4 mb-6 text-center bg-white rounded shadow-md sm:p-6">
                    <Image unoptimized src={Transaction} alt="Order Success" className='mx-auto' width={150} height={150} />
                    <h2 className="mt-4 text-lg font-semibold sm:text-2xl">Transaction Completed!</h2>
                    <p className="text-sm text-gray-500 sm:text-base">Your transaction has been successfully completed. It is currently awaiting admin approval.</p>
                    <Button asChild className="mt-3 group">
                        <Link href="/">
                        Continue Explore
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
                {/* Continue Shopping Button */}
             
            </div>
        </div>
    );
};

export default page;
