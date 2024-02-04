import { LanguageEnum } from '@flashcards/utils';

export const getFlagCode = (language: LanguageEnum) => {
  switch (language) {
    case LanguageEnum.ENGLISH:
      return 'gb';
    case LanguageEnum.FRENCH:
      return 'fr';
    case LanguageEnum.GERMAN:
      return 'de';
    case LanguageEnum.POLISH:
      return 'pl';
    case LanguageEnum.SPANISH:
      return 'es';
  }
};
