import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdoptionRequestService } from './adoption_request.service';
import { CreateAdoptionRequestDto } from './dto/create-adoption_request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption_request.dto';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../users/entities/user.entity';
import {
  BaseApiResponse,
  PaginatedResponse,
} from 'src/core/constants/response';
import { AdoptionRequest } from './entities/adoption_request.entity';
import { resBuilder } from 'src/core/utils/utils';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { Role } from 'src/core/constants/enums';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';

@Controller('adoption-request')
export class AdoptionRequestController {
  constructor(
    private readonly adoptionRequestService: AdoptionRequestService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADOPTER]))
  @Post()
  @ApiOkResponse({ type: AdoptionRequest })
  async create(
    @Body() createAdoptionRequestDto: CreateAdoptionRequestDto,
    @GetUser() user: User,
  ): Promise<BaseApiResponse<AdoptionRequest>> {
    const adoptionRequest = await this.adoptionRequestService.create(
      createAdoptionRequestDto,
      user,
    );

    return resBuilder(
      HttpStatus.CREATED,
      true,
      'Adoption request created',
      adoptionRequest,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN, Role.SHELTER_STAFF]))
  @Get()
  @ApiOkResponse({ type: AdoptionRequest, isArray: true })
  async findAll(
    query: QueryParamsDto,
  ): Promise<BaseApiResponse<PaginatedResponse<AdoptionRequest>>> {
    return await this.adoptionRequestService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    new RoleGuard([Role.ADMIN, Role.SHELTER_STAFF, Role.ADOPTER]),
  )
  @ApiOkResponse({ type: AdoptionRequest })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<BaseApiResponse<AdoptionRequest>> {
    const adoptionRequest = await this.adoptionRequestService.findOne(id);
    if (!adoptionRequest) {
      return resBuilder(
        HttpStatus.NOT_FOUND,
        false,
        'Adoption request not found',
      );
    }
    return resBuilder(
      HttpStatus.OK,
      true,
      'Get adoption request',
      adoptionRequest,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN, Role.SHELTER_STAFF]))
  @ApiOkResponse({ type: AdoptionRequest })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdoptionRequestDto: UpdateAdoptionRequestDto,
  ): Promise<BaseApiResponse<AdoptionRequest>> {
    return await resBuilder(
      HttpStatus.OK,
      true,
      'Adoption request updated',
      await this.adoptionRequestService.update(id, updateAdoptionRequestDto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard([Role.ADMIN, Role.SHELTER_STAFF]))
  @ApiOkResponse({ type: AdoptionRequest })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseApiResponse<void>> {
    await this.adoptionRequestService.remove(id);
    return resBuilder(HttpStatus.OK, true, 'Adoption request deleted', null);
  }
}
