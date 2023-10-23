import { Items } from "@/app/components/cart/CartComponent";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";

export function handleIncreaseDispatch({ product, dispatch }: { product: Items; dispatch: Dispatch; }) {
    dispatch(addToCart({
        productId: product.productId,
        size: product.size,
        imageUrl: product.imageUrl,
        productName: product.productName,
        color: product.color,
        cartId: product.cartId,
        price: product.price,
        productQuantity: Number(product.productQuantity),
        totalQuantity: Number(product.totalQuantity),
        quantityId: product.quantityId
    }));
}
