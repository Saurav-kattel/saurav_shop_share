import ProductPage from "./ProductPage";
import Error from "../../utils/Error";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loading from "@/app/services/utils/Loading";


async function getProductById({ id }: { id: string; }) {
    const res = await fetch(`${process.env.BASE_URL}/api/product/get-product-by-id`, {
        method: "GET",
        headers: {
            id
        },
        cache: "no-store"
    },);
    return await res.json();
}
export default async function Page({ params }: { params: { slug: string; }; }) {
    const product = await getProductById({ id: params.slug });
    return <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error />}>
            <ProductPage product={product.res.data} />;
        </ErrorBoundary>
    </Suspense>;

}