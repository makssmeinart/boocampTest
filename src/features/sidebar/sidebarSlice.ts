import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { fetchCategories } from "services/fetchCategories";
import { Category } from "common/commonTypes";

interface SidebarState {
  categories: Category[];
  currentCategoryId: number;
}
const initialState: SidebarState = {
  categories: [],
  currentCategoryId: 0,
};

export const fetchSidebarData = createAsyncThunk(
  "sidebar/fetchData",
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSidebarData.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const selectSidebarData = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer;
