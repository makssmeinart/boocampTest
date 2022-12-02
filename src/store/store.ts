import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer, catsReducer, appReducer } from "store/";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    cats: catsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useCustomDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
