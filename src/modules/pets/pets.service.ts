import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import {
  BaseApiResponse,
  PaginatedResponse,
} from 'src/core/constants/response';

@Injectable()
export class PetsService extends BaseService<Pet> {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    private readonly userService: UsersService,
    queryToolkit: QueryToolkitService,
  ) {
    super(petRepository, queryToolkit);
  }

  async create(createPetDto: CreatePetDto, user: User): Promise<Pet> {
    const shelter = user.shelter;

    let owner = null;
    if (createPetDto.ownerId) {
      owner = await this.userService.findOne(createPetDto.ownerId);
      if (!owner) {
        throw new BadRequestException('Owner not found');
      }
    }

    const pet = this.petRepository.create({ ...createPetDto, shelter, owner });
    return await this.petRepository.save(pet);
  }

  async bulkCreate(pets: CreatePetDto[]) {
    const pet = this.petRepository.create(pets);
    return await this.petRepository.save(pet);
  }

  async findAll(
    query: QueryParamsDto,
  ): Promise<BaseApiResponse<PaginatedResponse<Pet>>> {
    const allowedFields = ['name', 'species', 'color'];
    return this.baseFindAll(
      query,
      allowedFields,
      'pet',
      this.petRepository.metadata.relations.map((r) => r.propertyName),
    );
  }

  async findOne(id: string): Promise<Pet> {
    return await this.petRepository.findOneBy({ id });
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    let owner = null;
    if (updatePetDto.ownerId) {
      owner = await this.userService.findOne(updatePetDto.ownerId);
      if (!owner) {
        throw new BadRequestException('Owner not found');
      }
    }

    await this.petRepository.update(id, { ...updatePetDto, owner });
    return await this.petRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.petRepository.softDelete(id);
  }
}
