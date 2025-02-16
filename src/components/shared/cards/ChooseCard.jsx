import Image from 'next/image';
import React from 'react';

const ChooseCard = ({data}) => {
    return (
        <div className='flex flex-col gap-5 mx-auto bg-white border rounded w-full max-w-[350px] border-gray-200 hover:border-primary transition-all duration-500 px-4 py-6 '>
            <Image unoptimized src={data?.icon} width={60} height={60} alt={`${data?.icon} img`} className="w-[60px] mx-auto" />
            <h2 className="text-center font-semibold">{data?.title}</h2>
            <p className=' text-sm text-center'>{data?.description}</p>
        </div>
    );
};

export default ChooseCard;