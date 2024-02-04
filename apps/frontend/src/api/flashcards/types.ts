import { LanguageEnum } from '@flashcards/utils';

export type FlashcardsSet = {
  id: string;
  name: string;
  flashcards: Record<string, string>;
  originalLanguage: LanguageEnum;
  targetLanguage: LanguageEnum;
  userId: string;
  created_at: string;
  updated_at: string;
};

/* -------------------------------------------------------------------------- */

export type CreateFlashcardSetPayload = {
  name: string;
  originalLanguage: LanguageEnum;
  targetLanguage: LanguageEnum;
  flashcards: Record<string, string>;
};

export type CreateFlashcardSetResponse = FlashcardsSet;

/* -------------------------------------------------------------------------- */

export type FlashcardsSetInformation = {
  id: string;
  name: string;
  flashcardsCount: number;
  originalLanguage: LanguageEnum;
  targetLanguage: LanguageEnum;
  created_at: string;
  updated_at: string;
};

export type GetFlashcardsSetsResponse = FlashcardsSetInformation;
