import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false
        },
    },

    selectors: {
        selectUser: (sliceState) => sliceState
    }
})

export const { selectUser } = authSlice.selectors;

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;