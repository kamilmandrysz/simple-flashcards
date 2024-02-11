import { Injectable, NotFoundException } from '@nestjs/common';
import { FlashcardsSet } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEnum } from '@flashcards/utils';
import { UserService } from '../user';
import { BadRequestException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class FlashcardsSetService {
  constructor(
    @InjectRepository(FlashcardsSet) private repo: Repository<FlashcardsSet>,
    private i18n: I18nService,
    private userService: UserService
  ) {}

  async getUserFlashcardsSets(userId: string): Promise<FlashcardsSet[]> {
    const flashcardsSets = await this.repo.find({
      relations: ['user'],
      loadRelationIds: true,
      where: { user: { id: userId } },
    });

    return flashcardsSets;
  }

  async getFlashcardsSetById(id: string): Promise<FlashcardsSet> {
    try {
      const flashcardSet = await this.repo.findOne({
        where: { id },
        relations: ['user'],
      });

      return flashcardSet;
    } catch (e) {
      throw new NotFoundException(
        this.i18n.t('validations.messages.notFound', {
          lang: I18nContext.current().lang,
        })
      );
    }
  }

  async createFlashcardSet(
    userId: string,
    name: string,
    flashcards: object,
    originalLanguage: LanguageEnum,
    targetLanguage: LanguageEnum
  ): Promise<FlashcardsSet> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException(
        this.i18n.t('validations.messages.add', {
          lang: I18nContext.current().lang,
        })
      );
    }

    const flashcardSet = await this.repo.create({
      name,
      flashcards,
      originalLanguage,
      targetLanguage,
      user,
    });

    return await this.repo.save(flashcardSet);
  }

  async updateFlashcardSet(flashcardsSetId: string, attrs: Partial<FlashcardsSet>) {
    const flashcardsSet = await this.getFlashcardsSetById(flashcardsSetId);

    if (!flashcardsSet) {
      throw new BadRequestException(
        this.i18n.t('validations.messages.update', {
          lang: I18nContext.current().lang,
        })
      );
    }

    Object.assign(flashcardsSet, attrs);
    return this.repo.save(flashcardsSet);
  }

  async removeFlashcardSet(id: string) {
    const flashcardsSet = await this.getFlashcardsSetById(id);

    if (!flashcardsSet) {
      throw new BadRequestException(
        this.i18n.t('validations.messages.remove', {
          lang: I18nContext.current().lang,
        })
      );
    }

    return await this.repo.remove(flashcardsSet);
  }
}
