import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { BaseService } from 'src/common/base.service';
import { hashPassword } from 'src/core/utils/utils';
import { ShelterService } from '../shelter/shelter.service';
import { Role } from 'src/core/constants/enums';
import {
  BaseApiResponse,
  PaginatedResponse,
} from 'src/core/constants/response';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly shelterService: ShelterService,
    queryToolkit: QueryToolkitService,
  ) {
    super(userRepository, queryToolkit);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);

    let shelter = null;
    if (createUserDto.shelterId && createUserDto.role === Role.SHELTER_STAFF) {
      shelter = await this.shelterService.findOne(createUserDto.shelterId);
      if (!shelter) {
        throw new BadRequestException('Shelter not found');
      }
    }

    const user = this.userRepository.create({
      ...createUserDto,
      shelter,
    });

    return await this.userRepository.save(user);
  }

  async findAll(
    query: QueryParamsDto,
  ): Promise<BaseApiResponse<PaginatedResponse<User>>> {
    const allowedFields = ['fullName', 'email', 'role'];
    return this.baseFindAll(
      query,
      allowedFields,
      'user',
      this.userRepository.metadata.relations.map((r) => r.propertyName),
    );
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['adoptionRequests', 'pets', 'shelter'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    let shelter = null;
    if (updateUserDto.shelterId && updateUserDto.role === Role.SHELTER_STAFF) {
      shelter = await this.shelterService.findOne(updateUserDto.shelterId);
      if (!shelter) {
        throw new BadRequestException('Shelter not found');
      }
    }

    await this.userRepository.update(id, { ...updateUserDto, shelter });
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
