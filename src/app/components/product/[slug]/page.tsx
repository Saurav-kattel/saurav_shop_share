import ProductPage from "./ProductPage";
import Error from "../../utils/Error";

export default async function Page({ params }: { params: { slug: string; }; }) {

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
    const product = await getProductById({ id: params.slug });
    if (product.res.data) {
        return <ProductPage product={product.res.data} />;
    }
    return <Error />;
}