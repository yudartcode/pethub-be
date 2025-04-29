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
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Pet } from './entities/pet.entity';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiCreatedResponse({ type: Pet })
  async create(@Body() createPetDto: CreatePetDto) {
    return await this.petsService.create(createPetDto);
  }

  @Post('bulk')
  @ApiCreatedResponse({ type: Pet })
  async bulkCreate(@Body() createPetDto: CreatePetDto[]) {
    return await this.petsService.bulkCreate(createPetDto);
  }

  @Get()
  @ApiOkResponse({ type: Pet, isArray: true })
  async findAll(@Query() query: QueryParamsDto) {
    return await this.petsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Pet })
  async findOne(@Param('id') id: string) {
    return await this.petsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Pet })
  async update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return await this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Pet })
  async remove(@Param('id') id: string) {
    return await this.petsService.remove(id);
  }
}
