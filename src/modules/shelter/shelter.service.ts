import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import { Repository } from 'typeorm';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { BaseService } from 'src/common/base.service';
import {
  BaseApiResponse,
  PaginatedResponse,
} from 'src/core/constants/response';

@Injectable()
export class ShelterService extends BaseService<Shelter> {
  constructor(
    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>,
    queryToolkit: QueryToolkitService,
  ) {
    super(shelterRepository, queryToolkit);
  }

  async create(createShelterDto: CreateShelterDto): Promise<Shelter> {
    const shelter = this.shelterRepository.create(createShelterDto);
    return await this.shelterRepository.save(shelter);
  }

  async findAll(
    query: QueryParamsDto,
  ): Promise<BaseApiResponse<PaginatedResponse<Shelter>>> {
    const allowedFields = ['fullName', 'email', 'role'];
    return this.baseFindAll(
      query,
      allowedFields,
      'shelter',
      this.shelterRepository.metadata.relations.map((r) => r.propertyName),
    );
  }

  async findOne(id: string): Promise<Shelter> {
    return await this.shelterRepository.findOne({
      where: { id },
      relations: ['staff', 'pets'],
    });
  }

  async update(
    id: string,
    updateShelterDto: UpdateShelterDto,
  ): Promise<Shelter> {
    await this.shelterRepository.update(id, updateShelterDto);
    return this.shelterRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.shelterRepository.softDelete(id);
  }
}
