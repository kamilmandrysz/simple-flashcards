import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../../guards';
import { FlashcardsSetService } from './flashcards-set.service';
import { CreateUpdateUserDto } from './dto';
import { Serialize } from '../../interceptors';
import { UserFlashcardsSet } from './dto/user-flashcards-set.dto';
import { UserFlashcardsSets } from './dto/user-flashcards-sets.dto copy';
import { RemoveUserFlashcardsSet } from './dto';

@Controller('flashcards-set')
export class FlashcardsSetController {
  constructor(private flashcardsSetService: FlashcardsSetService) {}

  @UseGuards(AuthGuard)
  @Get()
  @Serialize(UserFlashcardsSets)
  async getUserFlashcardsSets(@Req() request: Request) {
    const { sub }: { sub: string } = request['user'];

    const flashcardsSets =
      await this.flashcardsSetService.getUserFlashcardsSets(sub);

    return flashcardsSets;
  }

  @UseGuards(AuthGuard)
  @Post()
  @Serialize(UserFlashcardsSet)
  async createFlashcardsSet(
    @Req() request: Request,
    @Body() body: CreateUpdateUserDto
  ) {
    const { sub }: { sub: string } = request['user'];

    const flashcardsSet = await this.flashcardsSetService.createFlashcardSet(
      sub,
      body.name,
      body.flashcards,
      body.originalLanguage,
      body.targetLanguage
    );

    return flashcardsSet;
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  @Serialize(UserFlashcardsSet)
  async updateFlashcardsSet(
    @Param() { id }: { id: string },
    @Body() body: CreateUpdateUserDto
  ) {
    const flashcardsSet = await this.flashcardsSetService.updateFlashcardSet(
      id,
      {
        name: body.name,
        flashcards: body.flashcards,
        originalLanguage: body.originalLanguage,
        targetLanguage: body.targetLanguage,
      }
    );

    return flashcardsSet;
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @Serialize(RemoveUserFlashcardsSet)
  async removeFlashcardsSet(@Param() { id }: { id: string }) {
    const flashcardsSet = await this.flashcardsSetService.removeFlashcardSet(
      id
    );

    return flashcardsSet;
  }
}
