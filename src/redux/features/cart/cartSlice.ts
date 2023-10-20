import { createSlice } from "@reduxjs/toolkit";
export type CartState = {
    total: number,
    cartItem: {
        cartId: string;
        productName: string,
        productQuantity: number,
        price: string,
        productId: string,
        imageUrl: string,
        size: string;
        color: string;

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
            console.log(action.payload);
            if (state.cartItem.length <= 0) {
                state.cartItem.push(action.payload);
            } else {
                let shouldPush = true;
                state.cartItem.map((product: CartState['cartItem']) => {
                    if (product.productId === action.payload.productId && product.color === action.payload.color && product.size === action.payload.size) {
                        shouldPush = false;
                        product.productQuantity++;
                    }
                });
                if (shouldPush) {
                    state.cartItem.push(action.payload);
                }
            }
            state.total = calculateTotal({ cart: state.cartItem });
        },
        removeItem: (state, action) => {
            state.cartItem.map((product: CartState['cartItem']) => {
                const shouldFilter = product.cartId === action.payload.cartId && action.payload.productQuantity <= 1;
                const shouldDecrease = product.cartId === action.payload.cartId && action.payload.productQuantity > 0;
                if (shouldFilter) {
                    state.cartItem = state.cartItem.filter((item: CartState['cartItem']) => item.cartId !== action.payload.cartId);
                } else if (shouldDecrease) {
                    product.productQuantity--;
                }
            });
            if (state.total > 0) {
                state.total = calculateTotal({ cart: state.cartItem });
            }
        }
    },

});

export default cartSlice.reducer;
export const { addToCart, removeItem } = cartSlice.actions;