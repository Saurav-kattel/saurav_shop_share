"use client";
import React, { SetStateAction } from 'react';
import { Products } from '../ProductComponent';

const Colors = ({
    quantity,
    setSelectedColor,
    selectedColor
}: {
    quantity: Products["quantity"];
    setSelectedColor: React.Dispatch<SetStateAction<{ id: string, color: string; }>>;
    selectedColor: { color: string, id: string; };
}) => {
    if (quantity) {
        return (
            <>
                <h4 className='text-xl text-zinc-800 '>Colors: ({selectedColor.color})</h4>
                <div className='flex gap-2 justify-start p-2     items-center'>
                    {quantity.map((items) => {
                        return <div key={items.id}>
                            < button className={`px-2 hover:scale-110 hover:shadow-md hover:shadow-green-700 hover:border-green-700  ${selectedColor.color === items.color ? "border-green-700 scale-105 shadow-md shadow-green-700" : null}   rounded-full  w-4 h-4 text-zinc-900 text-lg border-[1px] border-slate-900`}
                                onClick={() => {
                                    setSelectedColor({ color: items.color, id: items.id });
                                }}
                                style={{ backgroundColor: items.color, color: items.color === "black" ? "white" : "" }} >
                            </button >
                        </div>;
                    })}
                </div>
            </>
        );
    }
    return null;
};

export default Colors;