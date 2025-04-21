import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
