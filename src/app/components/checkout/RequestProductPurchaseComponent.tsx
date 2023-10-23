"use client";
import { Button } from '@/components/ui/button';
import { clearCart, requestPurchase } from '@/redux/features/cart/cartSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';

const RequestProductPurchaseComponent = ({ cartItem }: { cartItem: any; }) => {
    if (cartItem.length) {
        const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
        return (
            <Button
                className="bg-green-700 border-[1px] hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800"
                onClick={() => {
                    dispatch(requestPurchase(cartItem));
                    dispatch(clearCart());
                }}
                variant={"destructive"}>Place Order</Button>
        );
    }
    return null;
};

export default RequestProductPurchaseComponent;