import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { Cat, LoadingStatus, QueryParams } from "common/commonTypes";
import { fetchCats } from "services";

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
    categoryId: "null",
  },
  loading: "idle",
};

export const fetchCatsData = createAsyncThunk(
  "cats/fetchData",
  async (arg, { getState }) => {
    const { cats } = getState() as RootState;

    const payload: QueryParams = { ...cats.queryParams };

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
      // Seems like 60 is the limit. But in docs it is saying should be 100
      let newLimit = limit < 1 ? 1 : limit > 60 ? 60 : limit;

      const newPayload: QueryParams = {
        ...action.payload,
        limit: newLimit,
      };
      state.queryParams = newPayload;
    },
    updateCategory: (
      state,
      action: PayloadAction<{ categoryId: string | undefined }>
    ) => {
      const newPayload: QueryParams = {
        categoryId: action.payload.categoryId,
        page: 1,
        limit: 10,
      };

      state.queryParams = newPayload;
      state.cats = [];
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { updateQueryParams, updateCategory } = catsSlice.actions;

export default catsSlice.reducer;
