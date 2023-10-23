"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { ZipCodes } from '../../services/components/checkout/zipcode';
import { provinces } from '../../services/components/checkout/provinces';
import CartItems from '../cart/CartItems';
import { handleDecreaseDispatch } from '@/app/services/components/cart/handleDecreseDispach';
import { handleIncreaseDispatch } from '@/app/services/components/cart/handleIncreaseDispatch';
import CheckOutForm from './CheckOutForm';
import ClearCartComponent from '../cart/ClearCartComponent';
import RequestProductPurchaseComponent from './RequestProductPurchaseComponent';


const CheckoutComponent = () => {
    const cartItem = useSelector((state: any) => state.cart.cartItem);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        zipCode: Object.keys(ZipCodes.Koshi)[0].toString(),
        province: provinces.Koshi,
        phoneNumber: "",
    });
    const total = useSelector((state: any) => state.cart.total);
    return (
        <div className='flex flex-warp  gap-1 items-baseline justify-between px-3 py-2 w-[75vw] mt-6 rounded-md border-[1px] border-zinc-400'>

            <CheckOutForm setFormData={setFormData} formData={formData} />

            <div className='flex flex-col w-[35vw] overflow-y-scroll  items-center justify-center gap-1'>
                <h2 className='text-center text-2xl font-bold uppercase p-4 text-zinc-600'>Cart Summary</h2>
                <div className='text-right w-[33vw] text-3xl text-zinc-600'>Total: ${total}</div>
                <div className='h-[53vh]'>
                    <CartItems
                        cartItem={cartItem}
                        handleDecreaseDispatch={handleDecreaseDispatch}
                        handleIncreaseDispatch={handleIncreaseDispatch}
                    />

                    <div className='flex items-center justify-center bg-white w-[33vw]'>
                        <ClearCartComponent cartItem={cartItem} />
                        <RequestProductPurchaseComponent cartItem={cartItem} />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CheckoutComponent;