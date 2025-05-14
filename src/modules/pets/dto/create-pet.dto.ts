import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Gender } from 'src/core/constants/enums';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsNumber()
  age: number;

  @IsEnum(Gender)
  gender: Gender = Gender.MALE;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isAvailableForAdoption?: boolean;

  @IsOptional()
  @IsUUID()
  shelterId?: string;

  @IsOptional()
  @IsUUID()
  ownerId?: string;
}
