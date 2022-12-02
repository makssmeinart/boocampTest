import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "services/fetchCategories";
import { Category } from "common/commonTypes";

interface SidebarState {
  categories: Category[];
  currentCategory: Category;
}
const initialState: SidebarState = {
  categories: [],
  currentCategory: {
    name: "all",
    id: 0,
  },
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
  reducers: {
    updateCurrentCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { updateCurrentCategory } = sidebarSlice.actions;

export default sidebarSlice.reducer;
