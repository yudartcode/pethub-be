import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { BaseService } from 'src/common/base.service';
import { QueryToolkitService } from 'src/common/query-toolkit.service';
import { hashPassword } from 'src/core/utils/utils';

@Injectable()
export class AccountsService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    queryToolkit: QueryToolkitService,
  ) {
    super(accountRepository, queryToolkit);
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    createAccountDto.password = await hashPassword(createAccountDto.password);
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async findAll(params: QueryParamsDto) {
    const allowedFields = ['username', 'isActive', 'user.name'];
    return this.baseFindAll(
      params,
      allowedFields,
      'account',
      this.accountRepository.metadata.relations.map((r) => r.propertyName),
    );
  }

  async findOne(id: string) {
    return await this.accountRepository.findOneBy({ id });
  }

  async findByUsername(username: string) {
    return await this.accountRepository.findOneBy({ username });
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    if (updateAccountDto.password) {
      updateAccountDto.password = await hashPassword(updateAccountDto.password);
    }
    await this.accountRepository.update(id, updateAccountDto);
    return await this.accountRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.accountRepository.softDelete(id);
  }
}
