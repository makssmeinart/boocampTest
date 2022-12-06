export type Category = {
  name: string;
  id: number;
};

export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type QueryParams = {
  limit?: string;
  page?: string;
  category_ids?: string;
};

export type LoadingStatus = "idle" | "loading";

export type ThemeType = "light" | "dark";
