import { RootState } from "store/store";

const selectCatsData = (state: RootState) => state.cats;

export default selectCatsData;
