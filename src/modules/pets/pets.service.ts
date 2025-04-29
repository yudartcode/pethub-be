import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';

@Injectable()
export class PetsService extends BaseService<Pet> {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    queryToolkit: QueryToolkitService,
  ) {
    super(petRepository, queryToolkit);
  }

  async create(createPetDto: CreatePetDto) {
    const pet = this.petRepository.create(createPetDto);
    return await this.petRepository.save(pet);
  }

  async bulkCreate(pets: CreatePetDto[]) {
    const pet = this.petRepository.create(pets);
    return await this.petRepository.save(pet);
  }

  async findAll(query: QueryParamsDto) {
    const allowedFields = ['name', 'species', 'color'];
    return this.baseFindAll(
      query,
      allowedFields,
      'pet',
      this.petRepository.metadata.relations.map((r) => r.propertyName),
    );
  }

  async findOne(id: string) {
    return await this.petRepository.findOneBy({ id });
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    await this.petRepository.update(id, updatePetDto);
    return await this.petRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return await this.petRepository.softDelete(id);
  }
}
