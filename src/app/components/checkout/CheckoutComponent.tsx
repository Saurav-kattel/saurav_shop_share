"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ZipCodes } from '../../services/components/checkout/zipcode';
import { provinces } from '../../services/components/checkout/provinces';
import CartItems from '../cart/CartItems';
import { handleDecreaseDispatch } from '@/app/services/components/cart/handleDecreseDispach';
import { handleIncreaseDispatch } from '@/app/services/components/cart/handleIncreaseDispatch';
import CheckOutForm from './CheckOutForm';
import ClearCartComponent from '../cart/ClearCartComponent';
import RequestProductPurchaseComponent from './RequestProductPurchaseComponent';
import { resetResponse } from '@/app/services/components/checkout/resetResponse';
import { resetResponseMessages } from '@/redux/features/cart/cartSlice';


const CheckoutComponent = ({ auth }: { auth: string; }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [userData, setUserData] = useState({
        userEmail: "",
        firstname: "",
        lastname: "",
        zipcode: Object.keys(ZipCodes.Koshi)[0].toString(),
        province: provinces.Koshi,
        phoneNumber: "",
    });
    const [showError, setShowErrors] = useState<{ showError: boolean, errors: Record<string, { message: string; }>; }>({
        showError: false,
        errors: {}
    });


    const total = useSelector((state: any) => state.cart.total);
    const purchaseRequestError = useSelector((state: any) => state.cart.error);
    const cartItem = useSelector((state: any) => state.cart.cartItem);
    const showErrorPopUp = (isClicked === true) && (Object.keys(purchaseRequestError).length !== 0);
    const purchaseRequestSucess = useSelector((state: any) => state.cart.success);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isClicked) {
            setTimeout(() => {
                resetResponse({ dispatch, resetResponseMessages });
            }, 20000);
        }
    }, [isClicked]);

    return (
        <div className='flex flex-warp gap-1 items-baseline justify-between px-3 py-2 w-[75vw] mt-6 rounded-md border-[1px] border-zinc-400'>
            <CheckOutForm
                setUserData={setUserData} userData={userData} setShowError={setShowErrors} showError={showError} />

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

                        <RequestProductPurchaseComponent
                            auth={auth}
                            setShowErrors={setShowErrors}
                            cartItem={cartItem}
                            userData={userData}
                            setUserData={setUserData}
                            showErrors={showError}
                            setIsClicked={setIsClicked}
                        />

                    </div>
                </div>

            </div>
            <div className='absolute flex bottom-24  items-center justify-center w-[75vw]'>
                {(isClicked) && purchaseRequestSucess ? <div className='bg-white p-4 shadow-lg rounded-lg text-center text-green-800 text-lg'>Your Order Has Been Placed Successfly✅</div> : null}
                {showErrorPopUp ? <div className='bg-white p-4 shadow-lg rounded-lg text-center text-red-800 text-lg'> Error Placing Order 💀</div> : null}
            </div>
        </div>
    );
};

export default CheckoutComponent;