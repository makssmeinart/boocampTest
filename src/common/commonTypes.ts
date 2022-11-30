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
  limit: number;
  page: number | null;
  categoryId: number | null;
};

export type LoadingStatus = "idle" | "loading";
