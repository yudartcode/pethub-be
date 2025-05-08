import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionRequestController } from './adoption_request.controller';
import { AdoptionRequestService } from './adoption_request.service';

describe('AdoptionRequestController', () => {
  let controller: AdoptionRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdoptionRequestController],
      providers: [AdoptionRequestService],
    }).compile();

    controller = module.get<AdoptionRequestController>(AdoptionRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
