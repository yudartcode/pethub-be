import * as bcrypt from 'bcryptjs';

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
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_COST));
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
