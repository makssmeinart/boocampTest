import { RootState } from "store/store";

const selectSidebarData = (state: RootState) => state.sidebar;

export default selectSidebarData;
