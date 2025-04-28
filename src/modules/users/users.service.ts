import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { BaseService } from 'src/common/base.service';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountsService,
    queryToolkit: QueryToolkitService,
  ) {
    super(userRepository, queryToolkit);
  }

  async create(createUserDto: CreateUserDto) {
    const account = await this.accountService.findOne(createUserDto.accountId);
    if (!account) throw new Error('Account not found');
    const user = this.userRepository.create({ ...createUserDto, account });
    return await this.userRepository.save(user);
  }

  async findAll(query: QueryParamsDto) {
    const allowedFields = ['name', 'email'];
    return this.baseFindAll(
      query,
      allowedFields,
      'user',
      this.userRepository.metadata.relations.map((r) => r.propertyName),
    );
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return await this.userRepository.softDelete(id);
  }
}
