import React from 'react';
import ProductComponent from './ProductComponent';
import { Metadata } from 'next';
import Error from '../utils/Error';

export const metadata: Metadata = {
    title: 'Online Shopping',
};

const Page = async () => {
    let showError = false;
    async function fetchProducts() {
        const res = await fetch(`${process.env.BASE_URL}/api/product/get-product`, { cache: "no-store", });
        if (!res.ok) {
            showError = true;
        }
        else {
            return res.json();
        }
    }
    const data = await fetchProducts();
    if (!showError) {
        return (
            <>
                <ProductComponent products={data.res.product} />
            </>
        );
    }
    return <Error />;
};

export default Page;