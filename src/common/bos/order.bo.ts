export type OrderBo<T> = {
  [key in keyof T]?: 'ASC' | 'DESC';
};
