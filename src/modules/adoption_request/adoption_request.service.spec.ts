import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionRequestService } from './adoption_request.service';

describe('AdoptionRequestService', () => {
  let service: AdoptionRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoptionRequestService],
    }).compile();

    service = module.get<AdoptionRequestService>(AdoptionRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
