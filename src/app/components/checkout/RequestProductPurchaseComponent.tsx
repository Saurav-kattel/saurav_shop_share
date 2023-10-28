"use client";
import { cartItemWithUserDetils } from '@/app/services/components/checkout/cartItemWithUserDetails';
import { handleRequestPurcahse } from '@/app/services/components/checkout/handleRequestPurchase';
import { Button } from '@/components/ui/button';
import { clearCart, requestPurchase } from '@/redux/features/cart/cartSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RequestProductPurchaseComponent = ({ cartItem, userData, setShowErrors, showErrors, setUserData, setIsClicked }: {
    cartItem: any,
    userData: {
        firstname: string;
        lastname: string;
        phoneNumber: string;
        province: string;
        zipcode: string;
        userEmail: string;
    };
    setShowErrors: React.Dispatch<SetStateAction<any>>;
    setUserData: React.Dispatch<SetStateAction<any>>;
    showErrors: {
        showError: boolean;
        errors: Record<string, {
            message: string;
        }>;
    };
    setIsClicked: React.Dispatch<SetStateAction<any>>;
}) => {
    if (cartItem.length) {
        const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
        const finalData = cartItemWithUserDetils({ cartItem, userDetails: userData });
        const purchaseRequestError = useSelector((state: any) => state.cart.error);
        console.log(purchaseRequestError);
        return (
            <>
                <Button
                    className="bg-green-700 border-[1px] hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800"
                    onClick={() => {
                        handleRequestPurcahse({
                            finalData,
                            clearCart,
                            dispatch,
                            requestPurchase,
                            setShowErrors,
                            userData,
                            showErrors,
                            setUserData
                        });
                        setIsClicked(true);
                        setTimeout(() => {
                            setIsClicked(false);
                        }, 500);
                    }}

                    variant={"destructive"}>Place Order</Button >
            </>

        );
    }
    return null;
};

export default RequestProductPurchaseComponent;