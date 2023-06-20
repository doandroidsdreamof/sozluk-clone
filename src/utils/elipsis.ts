export const insertElipsis = (param: string, offset: number) => {
  const result =
    param.length >= offset ? param.substring(0, offset).concat("...") : param;
  return result;
};
