import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer, catsReducer, appReducer } from "features";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    cats: catsReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
