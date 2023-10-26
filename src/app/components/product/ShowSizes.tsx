import { removeDuplicateSize } from '@/app/services/components/product/removeDuplicateSize';
import React from 'react';
import { Products } from './ProductComponent';

const ShowSizes = ({ products }: { products: Products; }) => {
    if (products.quantity.length > 0) {
        return (
            <div className="flex gap-2"> Size: {removeDuplicateSize({ products: products.quantity }).map((items) => {
                return <span key={items.size}>{items.size}</span>;
            })}</div>
        );
    }
    return null;
};

export default ShowSizes;