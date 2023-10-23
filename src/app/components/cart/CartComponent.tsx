"üse client";
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeItem, requestPurchase } from '@/redux/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { ThunkDispatch } from '@reduxjs/toolkit';


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
    const total = useSelector((state: any) => state.cart.total);
    const error = useSelector((state: any) => state.cart.error);
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
                <div className="">
                    {cartItem.map((items: Items, idx: number) => {
                        return <div key={idx} className="flex flex-wrap gap-4 p-4 w-[37vw] items-center">
                            <img className='rounded-sm w-[60px] h-[40px]' src={items.imageUrl} width={60} height={60} alt={items.productName} />
                            <p className='text-lg font-bold text-zinc-600'>{items.productName} ({items.color}) ({items.size})</p>
                            <p className='text-zinc-600 text-xl'>${items.price}</p>
                            <button onClick={() => handleIncreaseDispatch({ product: items })}>+</button>
                            <p className='text-zinc-600 text-lg ' >{items.productQuantity}</p>
                            <button onClick={() => handleDecreaseDispatch({ product: items })}>-</button>
                        </div>;
                    })}
                </div>
                {cartItem.length ?
                    <div className='text-zinc-700 text-2xl m-2 p-4' >
                        Total: $ {total}
                    </div> : <p className='p-5 text-2xl text-zinc-600'>Cart Is Empty</p>
                }
                <div >
                    {cartItem.length ? <Button
                        className="text-white text-center hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800 border-[1px] mx-4"
                        variant={"destructive"}
                        onClick={() => {
                            dispatch(clearCart());
                        }}

                    >ClearCart</Button> : null}
                    <button onClick={() => dispatch(requestPurchase(cartItem))}>request</button>
                </div>
            </div >

        </>
    );
};

export default CartComponent;