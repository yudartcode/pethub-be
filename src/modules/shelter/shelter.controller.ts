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
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiGoneResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Shelter } from './entities/shelter.entity';
import { resBuilder } from 'src/core/utils/utils';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { Role } from 'src/core/constants/enums';

@Controller('shelter')
export class ShelterController {
  constructor(private readonly sheltersService: ShelterService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN]))
  @Post()
  @ApiCreatedResponse({ type: Shelter })
  async create(@Body() createShelterDto: CreateShelterDto) {
    const shelter = await this.sheltersService.create(createShelterDto);
    return resBuilder(HttpStatus.CREATED, true, 'Shelter created', shelter);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: [Shelter] })
  async findAll(@Query() query: QueryParamsDto) {
    return await this.sheltersService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: Shelter })
  async findOne(@Param('id') id: string) {
    const shelter = await this.sheltersService.findOne(id);
    if (!shelter)
      return resBuilder(HttpStatus.NOT_FOUND, false, 'Shelter not found');
    return resBuilder(HttpStatus.OK, true, 'Get shelter', shelter);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN]))
  @Patch(':id')
  @ApiOkResponse({ type: Shelter })
  async update(
    @Param('id') id: string,
    @Body() updateShelterDto: UpdateShelterDto,
  ) {
    const shelter = await this.sheltersService.update(id, updateShelterDto);
    return resBuilder(HttpStatus.OK, true, 'Shelter updated', shelter);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN]))
  @Delete(':id')
  @ApiGoneResponse({ type: Shelter })
  async remove(@Param('id') id: string) {
    const shelter = await this.sheltersService.remove(id);
    return resBuilder(HttpStatus.OK, true, 'Shelter deleted', shelter);
  }
}
