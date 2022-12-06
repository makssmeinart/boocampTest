import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cat, LoadingStatus, QueryParams } from "common/commonTypes";
import { fetchCats } from "services";

interface CatsState {
  cats: Cat[];
  loading: LoadingStatus;
}

const initialState: CatsState = {
  cats: [],
  loading: "idle",
};

export const fetchCatsData = createAsyncThunk(
  "cats/fetchData",
  async (payload: QueryParams) => {
    const response = await fetchCats(payload);
    return response;
  }
);

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    resetCatsData: (state) => {
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

export const { resetCatsData } = catsSlice.actions;

export default catsSlice.reducer;
