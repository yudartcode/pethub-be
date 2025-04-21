import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { PageParamsDto } from 'src/core/utils/utils';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async findAll(params: PageParamsDto) {
    const { sortBy, sortOrder, offset, limit } = params;

    const [data, total] = await this.accountRepository.findAndCount({
      order: { [sortBy]: sortOrder },
      skip: offset,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string) {
    const account = await this.accountRepository.findOneBy({ id });
    return account;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    await this.accountRepository.update(id, updateAccountDto);
    return await this.accountRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.accountRepository.softDelete(id);
  }
}
