export type OffsetPaginationBo = {
  limit: number;
  page: number;
};

export type OffsetPaginated<T> = {
  items: T[];
  total: number;
};
