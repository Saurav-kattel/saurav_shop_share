import { Items } from "@/app/components/cart/CartComponent";
import { removeItem } from "@/redux/features/cart/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";

export function handleDecreaseDispatch({ product, dispatch }: { product: Items; dispatch: Dispatch; }) {
    dispatch(removeItem({
        productId: product.productId,
        size: product.size,
        color: product.color,
        productQuantity: product.productQuantity,
        cartId: product.cartId
    }));
}