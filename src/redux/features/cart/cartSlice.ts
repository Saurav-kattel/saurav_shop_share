import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { revalidateTag } from "next/cache";
export type CartState = {
    total: number,
    cartItem: {
        cartId: string;
        productName: string,
        productQuantity: number,
        price: number,
        productId: string,
        imageUrl: string,
        size: string;
        color: string;
        totalQuantity: undefined | number;
        quantityId: string;

    };
};
export type CartVal = {
    cartId: string,
    productId: string;
    size: string;
    color: string;
    productQuantity: number;
    price: number;
    quantityId: string;
    firstname: string;
    lastname: string;
    province: string;
    zipcode: string;
    userEmail: string;
    phoneNumber: string;
    productName: string;
    imageUrl: string;
}[];
const initialState: Record<string, any> = {
    total: 0,
    cartItem: [],
    requestPending: false,
    success: {},
    error: {}
};

function calculateTotal({ cart }: { cart: CartState["cartItem"][]; }) {
    let total = 0.00;
    cart.map((items) => {
        let itemsTotalPrice = Number(items.price) * Number(items.productQuantity);
        total += itemsTotalPrice;
    });
    return total.toFixed(2);
}

const requestPurchase = createAsyncThunk("products/addtorequestqueue", async ({ cartItem, auth }: { cartItem: CartVal, auth: string; }) => {
    const reqArray = cartItem.map((item) => ({
        cartId: item.cartId,
        productName: item.productName,
        color: item.color,
        requestedQuantity: item.productQuantity,
        imageUrl: item.imageUrl,
        productId: item.productId,
        size: item.size,
        price: item.price,
        userId: "",
        quantityId: item.quantityId,
        firstname: item.firstname,
        lastname: item.lastname,
        userEmail: item.userEmail,
        province: item.province,
        zipcode: item.zipcode,
        phoneNumber: item.phoneNumber,
    }));
    const data = await fetch(`/api/product/request-purchase`, {
        method: "POST",
        headers: {
            auth: auth
        },
        body: JSON.stringify({
            cartItem: reqArray
        }),

    });
    return await data.json();
});

const cartSlice: any = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        resetResponseMessages: (state) => {
            state.success = {};
            state.error = {};
        },
        addToCart: (state, action: { payload: CartState['cartItem']; }) => {
            if (!action.payload.totalQuantity) {
                return;
            }
            if (Number(action.payload.totalQuantity) <= 0) {
                return;
            }
            if (state.cartItem.length <= 0) {
                state.cartItem.push(action.payload);
            } else {
                let shouldPush = true;
                state.cartItem.map((product: CartState['cartItem']) => {
                    if (
                        product.productId === action.payload.productId &&
                        product.color === action.payload.color &&
                        product.size === action.payload.size
                    ) {
                        shouldPush = false;
                        if (product.productQuantity < action.payload.totalQuantity!) {
                            product.productQuantity++;
                        }
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
        },
        clearCart: (state) => {
            state.total = 0;
            state.cartItem = [];
        },
    },
    extraReducers(builder) {
        builder.
            addCase(requestPurchase.pending, (state) => {
                state.requestPending = true;
            })
            .addCase(requestPurchase.rejected, (state, action) => {
                state.error = action.error;
                state.success = {};
                state.requestPending = false;

            })
            .addCase(requestPurchase.fulfilled, (state, action) => {
                state.error = {};
                state.requestPending = false;
                state.success = action.payload;
            });
    },
});

export default cartSlice.reducer;
export const { addToCart, resetResponseMessages, removeItem, clearCart } = cartSlice.actions;

export { requestPurchase };