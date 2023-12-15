import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches,
  IsString,
  IsAlphanumeric,
} from 'class-validator';
import { passwordRegEx } from '@flashcards/utils';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
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
  @IsAlphanumeric('en-GB', { message: 'validations.messages.alphaNumeric' })
  username: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validations.messages.required'),
  })
  @IsString({
    message: i18nValidationMessage('validations.messages.string'),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage('validations.messages.correctFormat') }
  )
  email: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validations.messages.required'),
  })
  @IsString({
    message: i18nValidationMessage('validations.messages.string'),
  })
  @Matches(passwordRegEx, {
    message: i18nValidationMessage('validations.messages.password'),
  })
  password: string;
}
