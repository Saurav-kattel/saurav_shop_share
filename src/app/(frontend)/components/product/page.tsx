import React, { Suspense } from 'react';
import ProductComponent from './ProductComponent';
import { Metadata } from 'next';
import { ErrorBoundary } from "react-error-boundary";
import Error from '../utils/Error';
import Loading from '@/app/services/utils/Loading';

export const metadata: Metadata = {
    title: 'Products - available products',
};
async function fetchProducts() {
    const res = await fetch(`${process.env.BASE_URL}/api/product/get-product`, {
        cache: "no-store",
    });
    return await res.json();
}
const Page = async () => {
    const data = await fetchProducts();
    return (
        <>
            <ErrorBoundary fallback={<Error />} >
                <Suspense fallback={<Loading />}>
                    <ProductComponent products={data.res["product"]} />
                </Suspense>
            </ErrorBoundary>

        </>
    );
};


export default Page;