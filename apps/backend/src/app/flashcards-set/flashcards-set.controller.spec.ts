import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardsSetController } from './flashcards-set.controller';

describe('FlashcardSetController', () => {
  let controller: FlashcardsSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardsSetController],
    }).compile();

    controller = module.get<FlashcardsSetController>(FlashcardsSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
