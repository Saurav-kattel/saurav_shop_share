"use client";
import { Button } from '@/components/ui/button';
import React from 'react';
const Colors = ({ colors }: { colors: { name: string; id: string; }[]; }) => {
    return (
        <div className='flex gap-2 justify-center items-center'>
            {colors.map((color) => {
                return <div key={color.id}>
                    < button className='px-2 hover:scale-110  rounded-md text-zinc-900 text-lg border-[1px] border-slate-900' style={{ backgroundColor: color.name, color: color.name === "black" ? "white" : "" }} >
                        {color.name}
                    </button >
                </div>;
            })}
        </div>
    );
};

export default Colors;