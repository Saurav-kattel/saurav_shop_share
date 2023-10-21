import React from 'react';
import ProductComponent from './ProductComponent';
import { Metadata } from 'next';
import Error from '../utils/Error';

export const metadata: Metadata = {
    title: 'Online Shopping',
};

const Page = async () => {
    async function fetchProducts() {
        const res = await fetch(`${process.env.BASE_URL}/api/product/get-product`);
        const data = await res.json();
        return data;
    }
    const data = await fetchProducts();
    if (data.res.product) {
        return (
            <>
                <ProductComponent products={data.res.product} />
            </>
        );
    }
    return <Error />;
};

export default Page;