import React from 'react';
import ProductPage from './ProductPage';


const Page = async () => {
    async function fetchProducts() {
        const res = await fetch(`${process.env.BASE_URL}/api/product/get-product`);
        const data = await res.json();
        return data;
    }
    const data = await fetchProducts();
    return (
        <ProductPage products={data.res.product} />
    );
};

export default Page;