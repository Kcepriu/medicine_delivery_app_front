export const getSortingDirection = (sortDirection: string) => {
  if (sortDirection === "price_asc") return sortDirection;
  if (sortDirection === "price_desc") return sortDirection;
  return "default";
}

export const getSearchParams = (sortDirection: string) => {
  const params = getSortingDirection(sortDirection);
  const stringSearchParams = params === "default" ? "" : `?sort=${params}`;

  return stringSearchParams;
}