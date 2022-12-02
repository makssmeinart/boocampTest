import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Cat, LoadingStatus, QueryParams } from "common/commonTypes";
import { fetchCats } from "services/fetchCats";
import { updateCurrentCategory } from "features/sidebar/sidebarSlice";

interface CatsState {
  cats: Cat[];
  queryParams: QueryParams;
  loading: LoadingStatus;
}

const initialState: CatsState = {
  cats: [],
  queryParams: {
    limit: 10,
    page: 1,
    categoryId: null,
  },
  loading: "idle",
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
      const { limit } = action.payload;
      let newLimit = limit < 1 ? 1 : limit > 50 ? 50 : limit;

      const newPayload: QueryParams = {
        ...action.payload,
        limit: newLimit,
      };

      state.queryParams = newPayload;
    },
  },
  extraReducers: (builder) => {
    // Maybe change the loading.
    builder.addCase(fetchCatsData.fulfilled, (state, action) => {
      state.cats.push(...action.payload);
      state.loading = "idle";
    });
    builder.addCase(fetchCatsData.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchCatsData.rejected, (state) => {
      state.loading = "idle";
    });
    builder.addCase(updateCurrentCategory, (state, action) => {
      const newQueryParams: QueryParams = {
        limit: 10,
        page: 1,
        categoryId: action.payload.id,
      };

      state.queryParams = newQueryParams;
      state.cats = [];
    });
  },
});

export const selectCatsData = (state: RootState) => state.cats;

export const { updateQueryParams } = catsSlice.actions;

export default catsSlice.reducer;
