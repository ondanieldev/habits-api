import { OffsetPaginationBo } from '../bos/offset-pagination.bo';

export class OffsetPaginationUtils {
  public getLimit = (pagination?: OffsetPaginationBo): number | undefined => {
    if (!pagination) return undefined;
    return pagination.limit;
  };

  public getOffset = (pagination?: OffsetPaginationBo): number | undefined => {
    if (!pagination) return undefined;
    return (pagination.page - 1) * pagination.limit;
  };
}
