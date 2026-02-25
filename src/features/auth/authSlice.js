import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOwner,
  loginOwner,
  logoutOwner,
  registerOwner,
} from "./authService";

const authSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    isAuthenticated: false,

    loading: {
      login: false,
      register: false,
      profile: false,
      logout: false,
      address: false,
    },

    error: null,
    message: null,

    isFetched: false, // 🔥 IMPORTANT FLAG
  },

  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH OWNER PROFILE ===== */
      .addCase(fetchOwner.pending, (state) => {
        state.loading.profile = true;
      })
      .addCase(fetchOwner.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isFetched = true; // ✅ profile fetched
      })
      .addCase(fetchOwner.rejected, (state, action) => {
        state.loading.profile = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isFetched = true; // ✅ tried once (important)
        state.error = action.payload?.message;
      })

      /* ===== REGISTER OWNER ===== */
      .addCase(registerOwner.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(registerOwner.fulfilled, (state, action) => {
        state.loading.register = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.isFetched = true;
      })
      .addCase(registerOwner.rejected, (state, action) => {
        state.loading.register = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Register failed";
      })

      /* ===== LOGIN OWNER ===== */
      .addCase(loginOwner.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.loading.login = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.isFetched = true;
      })
      .addCase(loginOwner.rejected, (state, action) => {
        state.loading.login = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Login failed";
      })

      /* ===== LOGOUT OWNER ===== */
      .addCase(logoutOwner.pending, (state) => {
        state.loading.logout = true;
      })
      .addCase(logoutOwner.fulfilled, (state, action) => {
        state.loading.logout = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isFetched = false; // 🔥 reset on logout
        state.message = action.payload.message;
      })
      .addCase(logoutOwner.rejected, (state, action) => {
        state.loading.logout = false;
        state.error = action.payload?.message || "Logout failed";
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
