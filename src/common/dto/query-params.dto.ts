import { IsOptional, IsString, IsNumberString, IsEnum } from 'class-validator';

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

  @IsOptional()
  @IsString()
  sort_by?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  sort_order?: SortOrder;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
