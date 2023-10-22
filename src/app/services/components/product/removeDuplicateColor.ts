import { Products } from "@/app/components/product/ProductComponent";

export function removeDuplicateColor({ products }: { products: Products["quantity"]; }) {
    const seenSizes: Record<string, boolean> = {};
    const filteredProducts = [];

    for (const product of products) {
        if (!seenSizes[product.color]) {
            seenSizes[product.color] = true;
            filteredProducts.push({ color: product.color, id: product.id, price: product.price });
        }
    }

    return filteredProducts;
}