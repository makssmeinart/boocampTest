const generateURLQueryParam = (url: string, objParams: any) => {
  const objFormatted = Object.fromEntries(
    Object.entries(objParams).filter(([_, v]) => v != null && v !== "")
  );
  if (Object.keys(objFormatted).length === 0) {
    return url;
  }

  const str =
    url +
    "?" +
    Object.keys(objFormatted)
      .map((key) => {
        return objFormatted[key] === "" || objFormatted[key] === null
          ? ""
          : //@ts-ignore
            `${key}=${encodeURIComponent(objFormatted[key])}`;
      })
      .join("&");

  return str;
};

export default generateURLQueryParam;
