import { IsEmail, IsString } from 'class-validator';

export class CreateShelterDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEmail()
  contactEmail: string;

  @IsString()
  phoneNumber: string;
}
