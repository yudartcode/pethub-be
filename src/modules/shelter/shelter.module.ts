import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter]), CommonModule],
  exports: [ShelterService],
  controllers: [ShelterController],
  providers: [ShelterService],
})
export class ShelterModule {}
