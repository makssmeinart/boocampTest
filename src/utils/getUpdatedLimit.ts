import { QueryParams } from "common/commonTypes";

type Params = {
  increaseLimit: boolean;
  params: QueryParams;
};

const getUpdatedLimit = ({ increaseLimit, params }: Params): QueryParams => {
  let newLimit = increaseLimit
    ? Number(params.limit) + 10
    : Number(params.limit) - 10;

  newLimit = newLimit < 1 ? 1 : newLimit > 50 ? 50 : newLimit;

  const payload: QueryParams = {
    ...params,
    limit: String(newLimit),
  };

  return payload;
};

export default getUpdatedLimit;
