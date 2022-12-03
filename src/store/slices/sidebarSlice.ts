import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "services/fetchCategories";
import { Category } from "common/commonTypes";

interface SidebarState {
  categories: Category[];
}
const initialState: SidebarState = {
  categories: [],
};

export const fetchCategoriesData = createAsyncThunk(
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
    builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default sidebarSlice.reducer;
