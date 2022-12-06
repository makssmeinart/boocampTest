import { axiosQuery, generateURLQueryParams } from "utils";
import { AxiosResponse } from "axios";
import { Cat, QueryParams } from "common/commonTypes";
import { ROUTES } from "constant/routes";

export const fetchCats = async (payload: QueryParams) => {
  let baseQuery: string = `/images/search`;

  const generatedQuery = generateURLQueryParams(baseQuery, payload);

  const { data }: AxiosResponse<Cat[]> = await axiosQuery.get(generatedQuery);

  if (data.length < 1) {
    window.location.href = ROUTES.PAGE_NOT_FOUND;
  }

  return data;
};

export default fetchCats;
