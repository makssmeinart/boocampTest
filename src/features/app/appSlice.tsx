import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { fetchCatsData } from "features/cats/catsSlice";
import { fetchCategoriesData } from "features/sidebar/sidebarSlice";
import { ThemeType } from "common/commonTypes";

interface AppState {
  error: string;
  theme: ThemeType;
}
const initialState: AppState = {
  error: "",
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateErrorStatus: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCatsData.rejected || fetchCategoriesData.rejected,
      (state, action) => {
        const error = action.error.message || "Some error occurred";
        state.error = error;
      }
    );
  },
});

export const selectAppData = (state: RootState) => state.app;

export const { updateErrorStatus, updateTheme } = appSlice.actions;

export default appSlice.reducer;
