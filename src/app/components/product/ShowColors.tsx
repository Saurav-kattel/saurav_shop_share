import { removeDuplicateColor } from '@/app/services/components/product/removeDuplicateColor';
import React from 'react';
import { Products } from './ProductComponent';

const ShowColors = ({ products }: { products: Products; }) => {
    return (
        <div className="flex gap-2">Colors: {removeDuplicateColor({ products: products.quantity }).map((items) => {
            return <span key={items.color} className={`w-4 h-4 rounded-full ${items.color === 'white' ? "border-[1px] border-slate-900" : null} `} style={{ background: items.color }}></span>;
        })}</div>
    );
};

export default ShowColors;