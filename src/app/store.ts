import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer, catsReducer } from "features";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    cats: catsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
