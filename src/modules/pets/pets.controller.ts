import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Pet } from './entities/pet.entity';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { Role } from 'src/core/constants/enums';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../users/entities/user.entity';
import {
  BaseApiResponse,
  PaginatedResponse,
} from 'src/core/constants/response';
import { resBuilder } from 'src/core/utils/utils';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.SHELTER_STAFF]))
  @Post()
  @ApiCreatedResponse({ type: Pet })
  async create(
    @Body() createPetDto: CreatePetDto,
    @GetUser() user: User,
  ): Promise<BaseApiResponse<Pet>> {
    const pet = await this.petsService.create(createPetDto, user);
    return resBuilder(HttpStatus.CREATED, true, 'Pet created', pet);
  }

  @Get()
  @ApiOkResponse({ type: Pet, isArray: true })
  async findAll(
    @Query() query: QueryParamsDto,
  ): Promise<BaseApiResponse<PaginatedResponse<Pet>>> {
    return await this.petsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Pet })
  async findOne(@Param('id') id: string): Promise<BaseApiResponse<Pet>> {
    const pet = await this.petsService.findOne(id);
    if (!pet) return resBuilder(HttpStatus.NOT_FOUND, false, 'Pet not found');
    return resBuilder(HttpStatus.OK, true, 'Get pet', pet);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.SHELTER_STAFF]))
  @Patch(':id')
  @ApiOkResponse({ type: Pet })
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<BaseApiResponse<Pet>> {
    const pet = await this.petsService.update(id, updatePetDto);
    return resBuilder(HttpStatus.OK, true, 'Pet updated', pet);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.SHELTER_STAFF]))
  @Delete(':id')
  @ApiOkResponse({ type: Pet })
  async remove(@Param('id') id: string): Promise<BaseApiResponse<void>> {
    await this.petsService.remove(id);
    return resBuilder(HttpStatus.OK, true, 'Pet deleted', null);
  }
}
