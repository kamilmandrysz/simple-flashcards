import { Module } from '@nestjs/common';
import {
  FlashcardsSet,
  FlashcardsSetController,
  FlashcardsSetService,
} from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([FlashcardsSet]), UserModule],
  controllers: [FlashcardsSetController],
  providers: [FlashcardsSetService],
})
export class FlashcardsSetModule {}
