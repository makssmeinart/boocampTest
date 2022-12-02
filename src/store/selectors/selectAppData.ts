import { RootState } from "store/store";

const selectAppData = (state: RootState) => state.app;

export default selectAppData;
