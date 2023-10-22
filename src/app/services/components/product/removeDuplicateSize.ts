import { Products } from "@/app/components/product/ProductComponent";

export function removeDuplicateSize({ products }: { products: Products["quantity"]; }) {
    const seenSizes: Record<string, boolean> = {};
    const filteredProducts = [];

    for (const product of products) {
        if (!seenSizes[product.size]) {
            seenSizes[product.size] = true;
            filteredProducts.push({ size: product.size, id: product.id, price: product.price });
        }
    }

    return filteredProducts;
}