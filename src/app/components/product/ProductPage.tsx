import React from 'react';
import CardComponent from './Card';
export type Products = {
    id: string;
    name: string;
    price: string;
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
    size: {
        id: string;
        name: string;
        productId: string;
    }[];
    quantiy: {
        id: string;
        name: string;
        total: string;
        productId: string;
    }[];

};

const ProductPage = ({ products }: { products: Products[]; }) => {
    return (
        <div className='flex flex-wrap gap-2 m-4 p-4 justify-center items-center'>
            {products.map((product) => {
                return < div key={product.id}><CardComponent products={product} /></div>;
            })
            }
        </div>
    );
};

export default ProductPage;