"use client";
import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutComponent = () => {
    const cartItem = useSelector((state: any) => state.cart.cartItem);
    return (
        <div>{JSON.stringify(cartItem)}</div>
    );
};

export default CheckoutComponent;