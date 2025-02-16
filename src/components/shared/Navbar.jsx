'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordian";
import { AiOutlineBars } from "react-icons/ai";
import Sidebar from './Siderbar/Sidebar';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const path = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(path.startsWith("/all-product") || path.startsWith("/searchImage/"));
    useEffect(() => {
        if (path.startsWith("/all-product") || path.startsWith("/searchImage/")) {
            setIsSidebarOpen(true);
        } else {
            setIsSidebarOpen(false);
        }
    }, [path]);

   

    const handleMouseEnter = () => {
        if (!path.startsWith("/all-product") || !path.startsWith("/searchImage/")) {
            setIsSidebarOpen(true);
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            if (path.startsWith("/all-product") || path.startsWith("/searchImage/")) {
                setIsSidebarOpen( window.scrollY <= 450);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [path]);


    return (
        <div className='bg-white w-full sticky top-0 z-[40] '>
            <div className={`container   `}>
            {/* Make this div sticky */}
            <div className=''>
                <div className='relative flex items-center justify-between w-full gap-3 px-0 py-3 transition-all duration-1000'>
                    <div
                        className='w-[210px] bg-secondary xl:block hidden rounded-md'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={!path.startsWith("/all-product") ? () => setIsSidebarOpen(false) : undefined}
                    >
                       <div>
                         <Accordion type="single" collapsible value={isSidebarOpen ? "item-1" : undefined}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="p-2.5 rounded-md font-bold">
                                    <div className='flex items-center justify-center gap-1'>
                                        <AiOutlineBars className='text-2xl' />
                                        <p>CATEGORIES</p>
                                    </div>
                                </AccordionTrigger>
                                <div className={`absolute z-50 left-0 rounded-md shadow-lg w-52 transition-all duration-500 pt-2`}>
                                    <AccordionContent>
                                        
                                        <Sidebar setIssideOpen={setIsSidebarOpen} />
                                    
                                    </AccordionContent>
                                </div>
                            </AccordionItem>
                        </Accordion>
                       </div>
                    </div>
                </div>
               
            </div>
        </div>
        </div>
    );
};

export default Navbar;
