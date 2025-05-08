import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsNumber()
  age: number;

  @IsString()
  gender: string;

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
