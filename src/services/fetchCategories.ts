import { AxiosResponse } from "axios";
import { Category } from "common/commonTypes";
import { axiosQuery } from "utils";

const fetchCategories = async () => {
  const { data }: AxiosResponse<Category[]> = await axiosQuery.get(
    "/categories"
  );

  return data;
};

export default fetchCategories;
