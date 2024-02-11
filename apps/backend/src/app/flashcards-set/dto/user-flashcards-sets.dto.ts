import { LanguageEnum } from '@flashcards/utils';
import { Expose, Transform } from 'class-transformer';

export class UserFlashcardsSets {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  originalLanguage: LanguageEnum;

  @Expose()
  targetLanguage: LanguageEnum;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: string;

  @Transform(({ obj }) => Object.keys(obj.flashcards).length)
  @Expose()
  flashcardsCount: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
