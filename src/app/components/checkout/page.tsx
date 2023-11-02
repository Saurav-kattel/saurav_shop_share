import React from 'react';
import CheckoutComponent from './CheckoutComponent';
import { cookies } from 'next/headers';

const page = () => {
    const auth = cookies().get("auth")?.value ?? '';
    return (
        <div className='flex items-center justify-center flex-col  overflow-y-hidden h-[100vh] '>
            <h1 className='text-4xl uppercase text-zinc-500 p-4 font-bold'>CheckOut Page</h1>
            <CheckoutComponent auth={auth} />
        </div >
    );
};

export default page;
