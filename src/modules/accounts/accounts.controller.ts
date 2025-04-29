import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Account } from './entities/account.entity';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create account' })
  @ApiCreatedResponse({ type: Account })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all accounts' })
  @ApiOkResponse({ type: Account, isArray: true })
  async findAll(@Query() params: QueryParamsDto) {
    return await this.accountsService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one account by id' })
  @ApiOkResponse({ type: Account })
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update account by id' })
  @ApiOkResponse({ type: Account })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by id' })
  @ApiOkResponse({ type: Account })
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
