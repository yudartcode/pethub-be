import { Injectable } from '@nestjs/common';
import { CreateAdoptionRequestDto } from './dto/create-adoption_request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption_request.dto';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptionRequest } from './entities/adoption_request.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { User } from '../users/entities/user.entity';
import { PetsService } from '../pets/pets.service';
import {
  BaseApiResponse,
  PaginatedResponse,
} from 'src/core/constants/response';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';

@Injectable()
export class AdoptionRequestService extends BaseService<AdoptionRequest> {
  constructor(
    @InjectRepository(AdoptionRequest)
    private readonly adoptionRequestRepository: Repository<AdoptionRequest>,
    private readonly petService: PetsService,
    queryToolkitService: QueryToolkitService,
  ) {
    super(adoptionRequestRepository, queryToolkitService);
  }
  async create(
    createAdoptionRequestDto: CreateAdoptionRequestDto,
    user: User,
  ): Promise<AdoptionRequest> {
    const pet = await this.petService.findOne(createAdoptionRequestDto.petId);

    const adoptionRequest = this.adoptionRequestRepository.create({
      ...createAdoptionRequestDto,
      requester: user,
      pet,
    });
    return await this.adoptionRequestRepository.save(adoptionRequest);
  }

  async findAll(
    query: QueryParamsDto,
  ): Promise<BaseApiResponse<PaginatedResponse<AdoptionRequest>>> {
    const allowedFields = ['status', 'message'];
    return this.baseFindAll(
      query,
      allowedFields,
      'adoptionRequest',
      this.adoptionRequestRepository.metadata.relations.map(
        (r) => r.propertyName,
      ),
    );
  }

  async findOne(id: string): Promise<AdoptionRequest> {
    return await this.adoptionRequestRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateAdoptionRequestDto: UpdateAdoptionRequestDto,
  ): Promise<AdoptionRequest> {
    const pet = await this.petService.findOne(updateAdoptionRequestDto.petId);
    await this.adoptionRequestRepository.update(id, {
      ...updateAdoptionRequestDto,
      pet,
    });
    return await this.adoptionRequestRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.adoptionRequestRepository.softDelete(id);
  }
}
