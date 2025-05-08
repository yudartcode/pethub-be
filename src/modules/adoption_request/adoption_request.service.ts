import { Injectable } from '@nestjs/common';
import { CreateAdoptionRequestDto } from './dto/create-adoption_request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption_request.dto';

@Injectable()
export class AdoptionRequestService {
  create(createAdoptionRequestDto: CreateAdoptionRequestDto) {
    return 'This action adds a new adoptionRequest';
  }

  findAll() {
    return `This action returns all adoptionRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adoptionRequest`;
  }

  update(id: number, updateAdoptionRequestDto: UpdateAdoptionRequestDto) {
    return `This action updates a #${id} adoptionRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} adoptionRequest`;
  }
}
