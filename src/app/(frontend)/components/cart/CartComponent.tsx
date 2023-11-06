"üse client";
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Total from './Total';
import ClearCartComponent from './ClearCartComponent';
import CartItems from './CartItems';
import { handleDecreaseDispatch } from '@/app/services/components/cart/handleDecreseDispach';
import { handleIncreaseDispatch } from '@/app/services/components/cart/handleIncreaseDispatch';
import CheckoutButton from './CheckoutButton';

export type Items = {
    productId: string;
    price: number;
    color: string;
    size: string;
    imageUrl: string,
    productName: string;
    productQuantity: number;
    cartId: string;
    totalQuantity: number;
    quantityId: string;
};

const CartComponent = () => {
    const cartItem = useSelector((state: any) => state.cart.cartItem);
    const cartRef = useRef<HTMLDivElement>(null);
    const [pathname, setPathname] = useState("");
    function toggleCart() {
        if (cartRef.current?.classList.contains("translate-x-0")) {
            cartRef.current?.classList.remove("translate-x-0");
            cartRef.current?.classList.add("translate-x-full");
        } else if (cartRef.current?.classList.contains("translate-x-full")) {
            cartRef.current?.classList.remove("translate-x-full");
            cartRef.current?.classList.add("translate-x-0");
        }

    }
    return (
        <>
            <section className='text-white font-bold hover:border-b-[1px] hover:border-rose-400 hover:text-rose-400' onClick={toggleCart}>
                CART
            </section>

            <div ref={cartRef} className="w-[40vw] h-[100vh] absolute top-0 right-0  transition  translate-x-full flex flex-col  bg-secondary overflow-y-scroll">
                <button onClick={toggleCart} className='text-slate-900 w-8 absolute p-4 right-0' > X</button>
                <h3 className='text-zinc-700 p-4 text-3xl '>Shopping Cart</h3>

                <CartItems
                    cartItem={cartItem}
                    handleDecreaseDispatch={handleDecreaseDispatch}
                    handleIncreaseDispatch={handleIncreaseDispatch}
                />

                <Total cartItem={cartItem} />
                <div className="flex  justify-around">

                    <ClearCartComponent
                        cartItem={cartItem}
                    />
                    <CheckoutButton
                        cartItem={cartItem}
                        toggle={toggleCart}
                    />
                </div>
            </div >

        </>
    );
};

export default CartComponent;