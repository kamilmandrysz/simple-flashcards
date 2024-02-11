export enum LanguageEnum {
  POLISH = 'PL',
  ENGLISH = 'EN',
  GERMAN = 'DE',
  FRENCH = 'FR',
  SPANISH = 'ES',
}

export const LANGUAGE_LABELS: Record<LanguageEnum, string> = {
  [LanguageEnum.ENGLISH]: 'English',
  [LanguageEnum.FRENCH]: 'French',
  [LanguageEnum.GERMAN]: 'German',
  [LanguageEnum.POLISH]: 'Polish',
  [LanguageEnum.SPANISH]: 'Spanish',
};
