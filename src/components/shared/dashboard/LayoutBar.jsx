"use client"
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";


const LayoutBar = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col gap-2">
            <div onClick={() => setOpen(!open)} className="flex items-center justify-between pr-3 cursor-pointer">
                <div className="flex items-center gap-2">
                    {item.icon} {item.title}
                </div>
                <span

                    className={`cursor-pointer ${open ? "rotate-180" : ""} transition-all duration-300`}
                >
                    <IoIosArrowDown />
                </span>
            </div>
            <div
                className={`grid gap-3  pl-6 transition-all overflow-hidden duration-300 ${open ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr]  opacity-0"}`}
            >
                <div className="flex flex-col gap-3 overflow-hidden">
                    {item.underRoutesData.map((item, idx) => (
                        <Link href={item.route} key={idx} className="" >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LayoutBar;
