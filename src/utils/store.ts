import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "./services/AuthApi";
import { hostApi } from "./services/HostApi";
import { episodeApi } from "./services/EpisodeApi";
import { categoryApi } from "./services/CategoryApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [hostApi.reducerPath]: hostApi.reducer,
    [episodeApi.reducerPath]: episodeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(hostApi.middleware)
      .concat(episodeApi.middleware)
      .concat(categoryApi.middleware),
});

// Optional: define types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
