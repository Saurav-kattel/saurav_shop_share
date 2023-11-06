"use client";
import { Button } from '@/components/ui/button';
import { clearCart } from '@/redux/features/cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const ClearCartComponent = ({ cartItem }: { cartItem: any; }) => {
    const dispatch = useDispatch();
    if (cartItem.length) {
        return (
            <div >
                <Button
                    className="text-white text-center hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800 border-[1px] mx-4"
                    variant={"destructive"}
                    onClick={() => {
                        dispatch(clearCart());
                    }}

                >ClearCart</Button>
            </div>
        );
    }
    return null;
};

export default ClearCartComponent;