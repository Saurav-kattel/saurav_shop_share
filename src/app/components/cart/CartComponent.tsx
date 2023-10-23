"üse client";
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeItem, requestPurchase } from '@/redux/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Total from './Total';
import ClearCartComponent from './ClearCartComponent';
import CartItems from './CartItems';


type Items = {
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
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const cartRef = useRef<HTMLDivElement>(null);
    function toggleCart() {
        if (cartRef.current?.classList.contains("translate-x-0")) {
            cartRef.current?.classList.remove("translate-x-0");
            cartRef.current?.classList.add("translate-x-full");
        } else if (cartRef.current?.classList.contains("translate-x-full")) {
            cartRef.current?.classList.remove("translate-x-full");
            cartRef.current?.classList.add("translate-x-0");
        }
    }

    function handleDecreaseDispatch({ product }: { product: Items; }) {

        dispatch(removeItem({
            productId: product.productId,
            size: product.size,
            color: product.color,
            productQuantity: product.productQuantity,
            cartId: product.cartId
        }));
    }
    function handleIncreaseDispatch({ product }: { product: Items; }) {
        dispatch(addToCart({
            productId: product.productId,
            size: product.size,
            imageUrl: product.imageUrl,
            productName: product.productName,
            color: product.color,
            cartId: product.cartId,
            price: product.price,
            productQuantity: Number(product.productQuantity),
            totalQuantity: Number(product.totalQuantity),
            quantityId: product.quantityId
        }));
    }

    return (
        <>
            <section onClick={toggleCart}>
                CART
            </section>

            <div ref={cartRef} className="w-[40vw] h-[100vh] absolute top-0 right-0  transition  translate-x-full flex flex-col  bg-secondary">
                <button onClick={toggleCart} className='text-slate-900 w-8 absolute p-4 right-0' > X</button>
                <h3 className='text-zinc-700 p-4 text-3xl '>Shopping Cart</h3>

                <CartItems
                    cartItem={cartItem}
                    handleDecreaseDispatch={handleDecreaseDispatch}
                    handleIncreaseDispatch={handleIncreaseDispatch}
                />

                <Total cartItem={cartItem} />
                <ClearCartComponent cartItem={cartItem} />

            </div >

        </>
    );
};

export default CartComponent;