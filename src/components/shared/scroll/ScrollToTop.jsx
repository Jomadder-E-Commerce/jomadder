import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDropupCircle } from 'react-icons/io';

const ScrollToTop = ({className}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            setIsVisible(scrollTop > windowHeight);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const smoothScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <IoIosArrowDropupCircle
                
                    onClick={smoothScroll}
                    className={cn("rounded-full  text-white cursor-pointer",className)}
                    size={40}
                />
            )}
        </>
    );
};

export default ScrollToTop;