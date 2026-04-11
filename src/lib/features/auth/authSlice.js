// authSlice.js (Updated)
import { SUPER_ADMIN_NOTIFICATIONS, SUPER_ADMIN_PLATFORMSETTINGS } from "@/constants/constant";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {
        id: "1",
        first_name: "Super",
        last_name: "Admin",
        email: "admin@fleettrack.in",
        phone: "+91 98201 00000",
        role: "super_admin",
        avatar: null,
        password: "Admin@123", // For demo purposes only
    },
    isAuthenticated: false,
    loading: true,
    notifications: SUPER_ADMIN_NOTIFICATIONS,
    platformSettings: SUPER_ADMIN_PLATFORMSETTINGS
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
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
        updateUserProfile: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        },
        updateUserPassword: (state, action) => {
            if (state.user) {
                state.user.password = action.payload
            }
        },
        setNotificationPreferences: (state, action) => {
            state.notifications = action.payload
        },
        updatePlatformSettings: (state, action) => {
            state.platformSettings = {
                ...state.platformSettings,
                ...action.payload
            }
        }
    },

    selectors: {
        selectUser: (sliceState) => sliceState
    }
})

export const { selectUser } = authSlice.selectors;

export const { setUser, clearUser, updateUserProfile, updateUserPassword, setNotificationPreferences, updatePlatformSettings } = authSlice.actions;

export default authSlice.reducer;