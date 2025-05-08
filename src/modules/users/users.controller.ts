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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { resBuilder } from 'src/core/utils/utils';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { Role } from 'src/core/constants/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return resBuilder(HttpStatus.CREATED, true, 'User created', user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN, Role.SHELTER_STAFF]))
  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll(@Query() query: QueryParamsDto) {
    return await this.usersService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) return resBuilder(HttpStatus.NOT_FOUND, false, 'User not found');
    return resBuilder(HttpStatus.OK, true, 'Get user', user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: User })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return resBuilder(HttpStatus.OK, true, 'User updated', user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN, Role.SHELTER_STAFF]))
  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return resBuilder(HttpStatus.OK, true, 'User deleted', user);
  }
}
