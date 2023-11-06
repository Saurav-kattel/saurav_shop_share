import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const CheckoutButton = ({ cartItem, toggle }: { cartItem: any; toggle: Function; }) => {
    if (cartItem.length) {
        return (
            <Link href={"/components/checkout"}
                onClick={() => {
                    toggle();
                }}
            ><Button className='bg-green-700 ml-8   hover:scale-105 hover:text-slate-900 border-[1px] hover:bg-inherit hover:border-slate-800' variant={"destructive"}>checkout</Button></Link>
        );
    }
};

export default CheckoutButton;