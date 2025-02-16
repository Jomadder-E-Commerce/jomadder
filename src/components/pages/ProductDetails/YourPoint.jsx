import { Card, CardContent } from '@/components/ui/card';
import { Gift, Medal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const YourPoint = () => {
    return (
        <Card className="max-w-md  bg-slate-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Medal className="w-6 h-6 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                You Achieved Level L0
              </h2>
            </div>
            
            <div className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-4 py-2">
              <span className="text-sm font-medium">0 Points</span>
            </div>
      
      <p><Link href={""}>See Details</Link></p>
             
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-purple-500" />
                <p className="text-sm text-gray-600">
                  Spend 50000 more to earn 1000 reward points!
                </p>
              </div>
            </div>
  
            <p className="text-xs text-gray-500">
              The more you shop, the more points you earn
            </p>
          </div>
        </CardContent>
      </Card>
    );
};

export default YourPoint;