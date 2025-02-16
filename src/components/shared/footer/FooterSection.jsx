import { cn } from '@/lib/utils';
import React from 'react';

const FooterSection = ({data=[],title='',className}) => {
    return (
        <div className={cn("xl:mx-auto",className)}>
        <div className="flex flex-col gap-3 ">
          {/* icon */}
          
          <p className="text-lg font-medium lg:text-xl">{title}</p>
          <div className="flex flex-col gap-3 mt-1 md:mt-4 sm:mt-3">
            {data.map((item, key) => (
              <div  className="md:text-sm text-[12px] font-normal flex gap-2 items-center" key={key}>
              
              <a href={item.href} className='flex gap-2 items-center'><p>{item.icon}</p>  {item?.title}</a> 
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default FooterSection;