import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAdoptionRequestDto {
  @IsUUID()
  petId: string;

  @IsOptional()
  @IsString()
  message?: string;
}
