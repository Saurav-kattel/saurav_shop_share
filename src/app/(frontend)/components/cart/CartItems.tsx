import React from 'react';
import { useDispatch } from 'react-redux';
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

const CartItems = ({ cartItem, handleIncreaseDispatch, handleDecreaseDispatch }: { cartItem: any; handleIncreaseDispatch: Function; handleDecreaseDispatch: Function; }) => {
    const dispatch = useDispatch();
    return (
        <div className="">
            {cartItem.map((items: Items, idx: number) => {
                return <div key={idx} className="flex flex-wrap gap-4 p-4 w-[33vw] items-center">
                    <img className='rounded-sm w-[60px] h-[40px]' src={items.imageUrl} width={60} height={60} alt={items.productName} />
                    <p className='text-lg font-bold text-zinc-600'>{items.productName} ({items.color}) ({items.size})</p>
                    <p className='text-zinc-600 text-xl'>${items.price}</p>
                    <button onClick={() => handleIncreaseDispatch({ product: items, dispatch: dispatch })}>+</button>
                    <p className='text-zinc-600 text-lg ' >{items.productQuantity}</p>
                    <button onClick={() => handleDecreaseDispatch({ product: items, dispatch: dispatch })}>-</button>
                </div>;
            })}
        </div>
    );
};

export default CartItems;