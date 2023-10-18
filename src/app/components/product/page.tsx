import React from 'react';
import ProductPage from './ProductPage';


const Page = async () => {
    async function fetchProducts() {
        const res = await fetch("http://localhost:3000/api/product/get-product");
        const data = await res.json();
        return data;
    }
    const data = await fetchProducts();
    return (
        <ProductPage products={data.res.product} />
    );
};

export default Page;