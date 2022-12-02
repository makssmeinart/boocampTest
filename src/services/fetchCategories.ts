import axiosQuery from "utils/axiosInstance";
import { AxiosResponse } from "axios";
import { Category } from "common/commonTypes";

export const fetchCategories = async () => {
  const { data }: AxiosResponse<Category[]> = await axiosQuery.get(
    "/categories"
  );

  return data;
};
