export const resBuilder = <T = any>(
  code: number,
  status: boolean,
  message: string,
  result: T | null = null,
) => {
  return {
    code,
    status,
    message,
    result,
  };
};

export const pageBuilder = <T = any>(
  data: T[],
  total: number,
  limit: number,
  offset: number,
) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPage = Math.ceil(total / limit);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPage;

  return {
    data,
    total,
    totalPage,
    currentPage,
    hasPrevPage,
    hasNextPage,
  };
};
