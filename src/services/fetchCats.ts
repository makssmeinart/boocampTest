import axiosQuery from "common/utils/axiosInstance";
import { AxiosResponse } from "axios";
import { Cat, QueryParams } from "common/commonTypes";

export const fetchCats = async ({ limit, page, categoryId }: QueryParams) => {
  const query = !!categoryId
    ? `/images/search?limit=${limit}&page=${page}&category_ids=${categoryId}`
    : `/images/search?limit=${limit}&page=${page}`;

  const { data }: AxiosResponse<Cat[]> = await axiosQuery.get(query);

  return data;
};
