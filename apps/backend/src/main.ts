import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors({ origin: ['http://localhost:4200'] });
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      errorFormatter: (errors) => {
        const result = {};

        errors.forEach((error) => {
          result[error.property] = error.constraints[Object.keys(error.constraints)[0]];
        });

        return result;
      },
    })
  );
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
