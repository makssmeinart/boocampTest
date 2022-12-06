import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useTypedSearchParams = <T>(
  defaultInit?: URLSearchParamsInit | undefined
): any => {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);

  type ParamType = Partial<Record<keyof T, string>>;
  let params: ParamType = {};

  // @ts-ignore
  for (const [key, value] of searchParams.entries()) {
    // @ts-ignore
    params[key] = value;
  }

  return [{ ...params }, setSearchParams] as const;
};
