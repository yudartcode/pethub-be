import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { pageBuilder, PageParamsDto, resBuilder } from 'src/core/utils/utils';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Account } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiCreatedResponse({ type: Account })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiOkResponse({ type: Account, isArray: true })
  async findAll(@Query() params: PageParamsDto) {
    const { limit, offset } = params;
    const { data, total } = await this.accountsService.findAll(params);

    return resBuilder(
      HttpStatus.OK,
      true,
      'Success',
      pageBuilder(data, total, limit, offset),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
