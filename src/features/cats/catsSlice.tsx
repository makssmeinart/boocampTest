import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Cat, QueryParams } from "common/commonTypes";
import { fetchCats } from "services/fetchCats";
import { updateCurrentCategory } from "../sidebar/sidebarSlice";

interface CatsState {
  cats: Cat[];
  queryParams: QueryParams;
}

const initialState: CatsState = {
  cats: [],
  queryParams: {
    limit: 10,
    page: 1,
    categoryId: null,
  },
};

export const fetchCatsData = createAsyncThunk(
  "cats/fetchData",
  async (arg, { getState }) => {
    const { cats } = getState() as RootState;
    const { limit, page, categoryId } = cats.queryParams;

    const payload: QueryParams = {
      limit,
      page,
      categoryId,
    };

    const response = await fetchCats(payload);
    return response;
  }
);

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    updateQueryParams: (state, action: PayloadAction<QueryParams>) => {
      state.queryParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatsData.fulfilled, (state, action) => {
      state.cats = action.payload;
    });
    // Update queryParams when we change category
    builder.addCase(updateCurrentCategory, (state, action) => {
      state.queryParams.categoryId = action.payload.id;
    });
  },
});

export const selectCatsData = (state: RootState) => state.cats;

export const { updateQueryParams } = catsSlice.actions;

export default catsSlice.reducer;
