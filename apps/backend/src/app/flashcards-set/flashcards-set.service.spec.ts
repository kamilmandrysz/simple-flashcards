import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardsSetService } from './flashcards-set.service';

describe('FlashcardSetService', () => {
  let service: FlashcardsSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashcardsSetService],
    }).compile();

    service = module.get<FlashcardsSetService>(FlashcardsSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
