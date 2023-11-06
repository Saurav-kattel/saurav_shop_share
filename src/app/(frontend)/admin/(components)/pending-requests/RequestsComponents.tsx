import { TCartItem } from '@/app/(backend)/api/product/request-purchase/route';
import React from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    ratingId: string;
    tags: string[];
}

interface CartItem {
    id: string;
    userId: string;
    productId: string;
    requestedQuantity: number;
    quantityId: string;
    color: string;
    price: number;
    size: string;
    firstname: string;
    phoneNumber: string;
    province: string;
    userEmail: string;
    zipcode: string;
    lastname: string;
    status: string;
    requestedAt: string;
    cartId: string;
    product: Product;
}
const RequestsComponents = ({ data }: { data: CartItem[]; }) => {
    return (
        <div>{data.map((item) => {
            return <div key={item.id} className=' bg-white m-4 flex flex-col items-center justify-center  p-4 shadow-sm shadow-rose-300 rounded-lg w-[60vw]  h-[150vh]'>
                <div className='flex-col gap-1 flex  text-zinc-800'>
                    <h4 className='text-4xl text-zinc-700 font-medium'>{item.product.name}</h4>
                    <span className='py-[0.1rem] text-md font-medium' >RequestedAt: {new Date(item.requestedAt).toUTCString()}</span>
                    <img className='text-center w-[40vw]' src={item.product.imageUrl} height={200} />
                    <div className='flex-col gap-1 mt-6 flex p-4 shadow-lg rounded-lg shadow-zinc-500 text-zinc-800'>
                        <span className='py-[0.1rem] text-md font-medium' >productId: {item.productId}</span>
                        <span className='py-[0.1rem] text-md font-medium' >quantityId: {item.quantityId}</span>
                        <span className='py-[0.1rem] text-md font-medium'  >cartID:  {item.cartId}</span>

                        <span className='py-[0.1rem] text-md font-medium' >Username: {item.firstname}  {item.lastname} </span>
                        <span className='py-[0.1rem] text-md font-medium' >Email: {item.userEmail} </span>
                        <span className='py-[0.1rem] text-md font-medium' >Price: ${item.price} </span>
                        <span className='py-[0.1rem] text-md font-medium' >Requested Quantity: {item.requestedQuantity}</span>
                        <span className='py-[0.1rem] text-md font-medium' >Color: {item.color}</span>
                        <span className='py-[0.1rem] text-md font-medium'> Size: {item.size}</span>
                        <span className='py-[0.1rem] text-md font-medium'> Total: ${item.price * item.requestedQuantity}</span>
                    </div>
                </div>
            </div>;
        })}</div>
    );
};

export default RequestsComponents;;