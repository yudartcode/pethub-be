import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsInt, Max, Min } from 'class-validator';

enum SearchMode {
  and = 'and',
  or = 'or',
}

enum MatchMode {
  fuzzy = 'fuzzy',
  exact = 'exact',
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  search_field?: string;

  @IsOptional()
  @IsString()
  search_value?: string;

  @IsOptional()
  @IsEnum(SearchMode)
  search_mode?: SearchMode;

  @IsOptional()
  @IsEnum(MatchMode)
  match_mode?: MatchMode;

  @ApiPropertyOptional({
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sort_by?: string;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.desc })
  @IsOptional()
  @IsEnum(SortOrder)
  sort_order?: SortOrder = SortOrder.desc;

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
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 10;
}
