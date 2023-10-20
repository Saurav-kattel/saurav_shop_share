import { createSlice } from "@reduxjs/toolkit";
export type CartState = {
    total: number,
    cartItem: {
        productName: string,
        productQuantity: number,
        price: string,
        productId: string,
        imageUrl: string,
        sizeId: string;

    };
};
const initialState: Record<string, any> = {
    total: 0,
    cartItem: []
};

function calculateTotal({ cart }: { cart: CartState["cartItem"][]; }) {
    let total = 0;
    cart.map((items) => {
        let itemsTotalPrice = Number(items.price) * items.productQuantity;
        total += itemsTotalPrice;
    });
    return total;
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action: { payload: CartState['cartItem']; }) => {
            if (state.cartItem.length > 0) {
                state.cartItem.push(action.payload);
            } else {
                let shouldPush = true;
                state.cartItem.map((product: CartState['cartItem']) => {
                    if (product.productId === action.payload.productId) {
                        shouldPush = false;
                        product.productQuantity++;
                    }
                });
                if (shouldPush) {
                    state.cartItem.push(action.payload);
                }
            }
            state.total = calculateTotal(state.cartItem);
        }
    }
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;