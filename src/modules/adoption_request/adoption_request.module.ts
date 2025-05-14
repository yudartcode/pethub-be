import { Module } from '@nestjs/common';
import { AdoptionRequestService } from './adoption_request.service';
import { AdoptionRequestController } from './adoption_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionRequest } from './entities/adoption_request.entity';
import { CommonModule } from 'src/common/common.module';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdoptionRequest]),
    CommonModule,
    PetsModule,
  ],
  controllers: [AdoptionRequestController],
  providers: [AdoptionRequestService],
})
export class AdoptionRequestModule {}
