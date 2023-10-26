import React from 'react';
import CheckoutComponent from './CheckoutComponent';

const page = () => {
    return (
        <div className='flex items-center justify-center flex-col  overflow-y-hidden h-[100vh] '>
            <h1 className='text-4xl uppercase text-zinc-500 p-4 font-bold'>CheckOut Page</h1>
            <CheckoutComponent />

        </div >
    );
};

export default page;
