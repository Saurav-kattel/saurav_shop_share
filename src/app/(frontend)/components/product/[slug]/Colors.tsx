"use client";
import React, { SetStateAction, useMemo } from 'react';
import { Products } from '../ProductComponent';

const Colors = ({
    quantity,
    setSelectedColor,
    selectedColor
}: {
    quantity: Products["quantity"];
    selectedColor: { color: string | null, id: string | null; };
    setSelectedColor: React.Dispatch<SetStateAction<typeof selectedColor>>;

}) => {
    if (selectedColor.color !== null) {

        return (
            <>
                <h4 className={`text-xl text-zinc-800`}>Colors: (<span style={{ color: selectedColor.color }}>{selectedColor.color.charAt(0).toUpperCase() + selectedColor.color.slice(1)}</span>)</h4>
                <div className='flex gap-2 justify-start p-2 items-center'>
                    {quantity.map((items) => {
                        return <div key={items.id}>
                            < button className={`px-2 hover:scale-110 hover:shadow-inner hover:shadow-rose-700 hover:border-rose-700  ${selectedColor.color === items.color ? "border-rose-700 scale-105 shadow shadow-rose-700" : null}   rounded-full  w-4 h-4 text-zinc-900 text-lg border-[1px] border-slate-900`}
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