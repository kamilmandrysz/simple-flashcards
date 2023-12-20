import { LanguageEnum } from '@flashcards/utils';
import { Expose, Transform } from 'class-transformer';

export class UserFlashcardsSet {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  flashcards: object;

  @Expose()
  originalLanguage: LanguageEnum;

  @Expose()
  targetLanguage: LanguageEnum;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
