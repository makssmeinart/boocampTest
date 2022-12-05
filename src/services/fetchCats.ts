import { axiosQuery } from "utils";
import { AxiosResponse } from "axios";
import { Cat, QueryParams } from "common/commonTypes";
import { ROUTES } from "constant/routes";

export const fetchCats = async ({ limit, page, categoryId }: QueryParams) => {
  let query: string = `/images/search?limit=${limit}&page=${page}&category_ids=${categoryId}`;

  if (categoryId === "null") {
    query = `/images/search?limit=${limit}&page=${page}`;
  }

  const { data }: AxiosResponse<Cat[]> = await axiosQuery.get(query);

  if (data.length < 1) {
    window.location.href = ROUTES.PAGE_NOT_FOUND;
  }

  return data;
};

export default fetchCats;
