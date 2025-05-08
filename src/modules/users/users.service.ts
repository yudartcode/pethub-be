import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { BaseService } from 'src/common/base.service';
import { hashPassword } from 'src/core/utils/utils';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    queryToolkit: QueryToolkitService,
  ) {
    super(userRepository, queryToolkit);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(query: QueryParamsDto) {
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
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
