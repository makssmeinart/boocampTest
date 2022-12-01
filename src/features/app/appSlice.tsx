import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { fetchCatsData } from "features/cats/catsSlice";
import { fetchCategoriesData } from "features/sidebar/sidebarSlice";

interface AppState {
  error: string;
}
const initialState: AppState = {
  // Removed global loading because it dosen't work well with infinite scroll
  error: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateErrorStatus: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
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

export const { updateErrorStatus } = appSlice.actions;

export default appSlice.reducer;
