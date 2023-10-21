"use client";
import { Button } from '@/components/ui/button';
import React, { SetStateAction } from 'react';
import { Products } from '../ProductComponent';
const Colors = ({ quantity, setSelectedColor }: { quantity: Products["quantity"]; setSelectedColor: React.Dispatch<SetStateAction<string>>; }) => {
    return (
        <div className='flex gap-2 justify-center items-center'>
            {quantity.map((items) => {
                return <div key={items.id}>
                    < button className='px-2 hover:scale-110  rounded-md text-zinc-900 text-lg border-[1px] border-slate-900'
                        onClick={() => {
                            setSelectedColor(items.color);
                        }}
                        style={{ backgroundColor: items.color, color: items.color === "black" ? "white" : "" }} >
                        {items.color}
                    </button >
                </div>;
            })}
        </div>
    );
};

export default Colors;