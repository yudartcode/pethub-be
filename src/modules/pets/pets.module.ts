import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), CommonModule, UsersModule],
  exports: [PetsService],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
