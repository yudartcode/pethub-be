import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Gender } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEnum(Gender, { message: 'gender must be MALE or FEMALE' })
  gender: Gender;

  @IsEmail()
  email: string;

  @IsPhoneNumber('ID', { message: 'phone number must start with 62' })
  @IsOptional()
  phone?: string;

  @IsString()
  address: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsUUID()
  accountId: string;
}
