import { Module } from '@nestjs/common';
import { AdoptionRequestService } from './adoption_request.service';
import { AdoptionRequestController } from './adoption_request.controller';

@Module({
  controllers: [AdoptionRequestController],
  providers: [AdoptionRequestService],
})
export class AdoptionRequestModule {}
