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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { pageBuilder, PageParamsDto, resBuilder } from 'src/core/utils/utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return resBuilder(HttpStatus.CREATED, true, 'User created', user);
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll(@Query() params: PageParamsDto) {
    const { limit, offset } = params;
    const { data, total } = await this.usersService.findAll(params);

    return resBuilder(
      HttpStatus.OK,
      true,
      'Success',
      pageBuilder(data, total, limit, offset),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    return resBuilder(HttpStatus.OK, true, 'Get users', user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(id, updateUserDto);
    return resBuilder(HttpStatus.OK, true, 'User updated', user);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id') id: string) {
    const user = this.usersService.remove(id);
    return resBuilder(HttpStatus.OK, true, 'User deleted', user);
  }
}
