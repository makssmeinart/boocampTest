import { Category } from "common/commonTypes";

type PropsType = {
  categories: Category[];
  currentCategoryId: number;
};

const getCategoryName = ({
  currentCategoryId,
  categories,
}: PropsType): string => {
  const currentCategory = categories.find(
    (category) => category.id === currentCategoryId
  );

  return currentCategory ? currentCategory.name : "all";
};

export default getCategoryName;
