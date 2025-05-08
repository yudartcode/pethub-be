import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdoptionRequestService } from './adoption_request.service';
import { CreateAdoptionRequestDto } from './dto/create-adoption_request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption_request.dto';

@Controller('adoption-request')
export class AdoptionRequestController {
  constructor(private readonly adoptionRequestService: AdoptionRequestService) {}

  @Post()
  create(@Body() createAdoptionRequestDto: CreateAdoptionRequestDto) {
    return this.adoptionRequestService.create(createAdoptionRequestDto);
  }

  @Get()
  findAll() {
    return this.adoptionRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptionRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdoptionRequestDto: UpdateAdoptionRequestDto) {
    return this.adoptionRequestService.update(+id, updateAdoptionRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptionRequestService.remove(+id);
  }
}
