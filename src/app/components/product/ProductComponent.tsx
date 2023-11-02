import React from 'react';
import CardComponent from './Card';
export type Products = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    ratingId: string;
    category: string[];
    rating: {
        id: string;
        rating: string;
    };
    tags: string[];
    quantity: {
        id: string;
        color: string;
        size: string;
        total: string;
        productId: string;
        price: number;
    }[];

};

const ProductComponent = ({ products }: { products: Products[]; }) => {
    return (
        <div className='flex flex-wrap gap-2 bg-zinc-300 rounded-md  p-4 justify-center items-center'>
            {products.map((product) => {
                return <div key={product.id}><CardComponent products={product} /></div>;
            })
            }
        </div>
    );
};

export default ProductComponent;