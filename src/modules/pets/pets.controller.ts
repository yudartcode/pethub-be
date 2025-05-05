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

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: Pet })
  async create(@Body() createPetDto: CreatePetDto) {
    return await this.petsService.create(createPetDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: Pet })
  async update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return await this.petsService.update(id, updatePetDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ type: Pet })
  async remove(@Param('id') id: string) {
    return await this.petsService.remove(id);
  }
}
