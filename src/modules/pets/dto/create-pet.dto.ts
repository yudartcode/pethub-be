import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/modules/users/entities/user.entity';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsEnum(Gender, { message: 'gender must be MALE or FEMALE' })
  gender: Gender;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString({ each: true })
  @IsOptional()
  pictures?: string[];

  @IsOptional()
  dob?: Date;

  @IsBoolean()
  isDead?: boolean = false;
}
