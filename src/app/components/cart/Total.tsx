"use client";
import React from 'react';
import { useSelector } from 'react-redux';

const Total = ({ cartItem }: { cartItem: any; }) => {
    const total = useSelector((state: any) => state.cart.total);
    if (cartItem.length) {
        return (
            <div className='text-zinc-700 text-2xl m-2 p-4' >
                Total: $ {total}
            </div>
        );
    }
    return <p className='p-5 text-2xl text-zinc-600'>Cart Is Empty</p>;

};

export default Total;