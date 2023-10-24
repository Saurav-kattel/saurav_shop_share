"use client";
import { cartItemWithUserDetils } from '@/app/services/components/checkout/cartItemWithUserDetails';
import { Button } from '@/components/ui/button';
import { clearCart, requestPurchase } from '@/redux/features/cart/cartSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';

const RequestProductPurchaseComponent = ({ cartItem, userData }: {
    cartItem: any,
    userData: {
        firstname: string;
        lastname: string;
        phoneNumber: string;
        province: string;
        zipcode: string;
        userEmail: string;
    };
}) => {

    if (cartItem.length) {
        const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
        const finalData = cartItemWithUserDetils({ cartItem, userDetails: userData });
        console.log(finalData);
        return (
            <Button
                className="bg-green-700 border-[1px] hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800"
                onClick={() => {
                    dispatch(requestPurchase(finalData));
                    dispatch(clearCart());
                }}
                variant={"destructive"}>Place Order</Button>
        );
    }
    return null;
};

export default RequestProductPurchaseComponent;