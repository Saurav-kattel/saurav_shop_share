import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const checkIsAdmin = createAsyncThunk("checkIsAdmin", async (auth: string) => {
    const res = await fetch("/api/user/get_user", {
        method: "GET",
        headers: {
            auth
        }
    });
    return res.json();
});

const adminSlice = createSlice({
    name: "admin-slice",
    initialState: {
        isAdmin: false,
        username: ''
    }, reducers: {},
    extraReducers: builder => {
        builder.addCase(checkIsAdmin.fulfilled, (state, action) => {
            if (action.payload.res && action.payload.res.user && action.payload.res.user.role === "Admin") {
                state.isAdmin = true;
                state.username = action.payload.res.user.username;
            }

        });
    }
});

export default adminSlice.reducer;
export { checkIsAdmin };