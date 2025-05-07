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

export const hashPassword = async (password: string) => {
  return await Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: parseInt(process.env.BCRYPT_COST || '10'),
  });
};

export const comparePassword = async (password: string, hash: string) => {
  return await Bun.password.verify(password, hash);
};
