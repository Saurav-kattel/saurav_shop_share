import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Error"
};
const Error = () => {
    return (
        <div className='flex flex-col w-full h-[80vh] justify-center items-center gap-3'>
            <div className='p-2 text-center text-3xl text-red-600'>Opps! Error Occured</div>
            <div className='text-[6rem] text-center p-2'>😢</div>
            <div className='p-2 text-center text-2xl text-zinc-600'>Try Reloaing The Page!</div>
        </div>
    );
};

export default Error;