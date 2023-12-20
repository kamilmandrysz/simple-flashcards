import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { LanguageEnum } from '@flashcards/utils';
import type { User } from '../../user';

@Entity()
export class FlashcardsSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('json')
  flashcards: object;

  @Column('enum', {
    enum: LanguageEnum,
    default: LanguageEnum.GERMAN,
  })
  originalLanguage: LanguageEnum;

  @Column('enum', {
    enum: LanguageEnum,
    default: LanguageEnum.GERMAN,
  })
  targetLanguage: LanguageEnum;

  @ManyToOne('User', 'flashcardsSets')
  user: Relation<User>;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
