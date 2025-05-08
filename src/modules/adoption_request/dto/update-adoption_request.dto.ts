import { PartialType } from '@nestjs/swagger';
import { CreateAdoptionRequestDto } from './create-adoption_request.dto';

export class UpdateAdoptionRequestDto extends PartialType(CreateAdoptionRequestDto) {}
