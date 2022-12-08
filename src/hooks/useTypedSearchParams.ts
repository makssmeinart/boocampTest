import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useTypedSearchParams = <T>(
  defaultInit?: URLSearchParamsInit | undefined
) => {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);

  type ParamType = Partial<Record<keyof T, string>>;
  let params: ParamType = {};

  for (const [key, value] of searchParams.entries()) {
    params[key as keyof ParamType] = value;
  }

  return [{ ...params }, setSearchParams] as const;
};
