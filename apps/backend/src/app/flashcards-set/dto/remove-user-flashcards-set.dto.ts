import { LanguageEnum } from '@flashcards/utils';
import { Expose, Transform } from 'class-transformer';

export class RemoveUserFlashcardsSet {
  @Expose()
  name: string;

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
