import {
  IsNotEmpty,
  MinLength,
  IsObject,
  IsString,
  IsNotEmptyObject,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';
import { LanguageEnum } from '@flashcards/utils';

export class CreateUpdateUserDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validations.messages.required'),
  })
  @MinLength(3, {
    message: i18nValidationMessage('validations.messages.minLength', {
      length: 3,
    }),
  })
  @IsString({
    message: i18nValidationMessage('validations.messages.string'),
  })
  name: string;

  @IsNotEmptyObject(
    {},
    { message: i18nValidationMessage('validations.messages.required') }
  )
  @IsObject({ message: i18nValidationMessage('validations.messages.object') })
  flashcards: object;

  @Transform(({ value }) => `${value}`)
  @IsEnum(LanguageEnum, {
    message: i18nValidationMessage('validations.messages.enum'),
  })
  originalLanguage: LanguageEnum;

  @Transform(({ value }) => `${value}`)
  @IsEnum(LanguageEnum, {
    message: i18nValidationMessage('validations.messages.enum'),
  })
  targetLanguage: LanguageEnum;
}
