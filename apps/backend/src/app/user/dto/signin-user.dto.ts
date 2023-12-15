import { IsString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignInUserDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validations.messages.required'),
  })
  @IsString({
    message: i18nValidationMessage('validations.messages.string'),
  })
  emailOrUsername: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validations.messages.required'),
  })
  @IsString({
    message: i18nValidationMessage('validations.messages.string'),
  })
  password: string;
}
