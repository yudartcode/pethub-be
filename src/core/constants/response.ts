export class BaseApiResponse<T = any> {
  code: number;
  status: boolean;
  message: string;
  result: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPage: number;
  currentPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
