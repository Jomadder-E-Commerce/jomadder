import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordian";
import { AiOutlineBars } from 'react-icons/ai';
import Sidebar from '../Siderbar/Sidebar';
const Category = () => {
    const path = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState('');


    const handleMouseEnter = () => {
          setIsSidebarOpen(true);
      
    };

    const onMouseLeave = ()=>{
      if(path.startsWith("/all-product") || path.startsWith("/searchImage")){
        setIsSidebarOpen(true)
      }
      else{
        setIsSidebarOpen(false)
      }
    }
    return (
        <div
        className="w-[200px] bg-secondary lg:block hidden rounded-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div>
          <Accordion
            type="single"
            collapsible
            value={isSidebarOpen ? "item-1" : undefined}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-2.5 rounded-md font-bold">
                <div className="flex items-center justify-center gap-1">
                  <AiOutlineBars className="text-2xl" />
                  <p>CATEGORIES</p>
                </div>
              </AccordionTrigger>
              <div
                className={`absolute z-[100] left-50 rounded-md shadow-lg max-w-full w-[200px] transition-all duration-500 pt-2`}
              >
                <AccordionContent>
                  <Sidebar className="z-50"  setIssideOpen={setIsSidebarOpen} />
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
};

export default Category;