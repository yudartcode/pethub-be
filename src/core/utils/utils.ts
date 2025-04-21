import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

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
  const current_page = Math.floor(offset / limit) + 1;
  const total_page = Math.ceil(total / limit);
  const has_previous_page = current_page > 1;
  const has_next_page = current_page < total_page;

  return {
    data,
    total,
    total_page,
    current_page,
    has_previous_page,
    has_next_page,
  };
};

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageParamsDto {
  @ApiPropertyOptional({
    default: 'createdAt',
  })
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  sortOrder?: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;
}
