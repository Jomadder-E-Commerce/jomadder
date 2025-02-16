import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const CostOption = () => {
    return (
        <div className="lg:hidden flex justify-center py-3  sm:text-sm text-[13px] flex-col gap-1 items-center">
            <h2>শিপিং চার্জ জানতে ভিজিট করুন</h2>
            <Link href="/shipping-rate">
            <button className="bg-primary px-2 py-1 text-white rounded-lg">Visit</button>
            </Link>
            

        </div>
    );
};

export default CostOption;