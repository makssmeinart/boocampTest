import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "common/commonTypes";
import { RootState } from "app/store";
import { fetchCatsData } from "features/cats/catsSlice";
import { fetchCategoriesData } from "features/sidebar/sidebarSlice";

interface AppState {
  loading: LoadingStatus;
  error: string;
}
const initialState: AppState = {
  loading: "idle",
  error: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.loading = action.payload;
    },
    updateErrorStatus: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // With the loading there is 2 ways I think. With dispatch and this one. I prefer dispatch but since I already do everything with extra reducers. Will just stick to it.
    builder.addCase(
      fetchCatsData.rejected || fetchCategoriesData.rejected,
      (state, action) => {
        const error = action.error.message || "Some error occurred";
        state.error = error;
      }
    );
    builder.addCase(
      fetchCatsData.fulfilled ||
        fetchCatsData.rejected ||
        fetchCategoriesData.fulfilled ||
        fetchCategoriesData.rejected,
      (state) => {
        state.loading = "idle";
      }
    );
    builder.addCase(
      fetchCatsData.pending || fetchCategoriesData.pending,
      (state) => {
        state.loading = "loading";
      }
    );
  },
});

export const selectAppData = (state: RootState) => state.app;

export const { updateErrorStatus } = appSlice.actions;

export default appSlice.reducer;
