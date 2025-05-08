import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Role } from 'src/core/constants/enums';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  fullName: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsPhoneNumber('ID')
  phoneNumber?: string;

  @IsOptional()
  @IsUUID()
  shelterId?: string;
}
