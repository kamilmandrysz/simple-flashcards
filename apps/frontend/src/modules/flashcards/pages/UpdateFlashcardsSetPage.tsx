import { InferType } from 'yup';

import { FlashcardsSet } from '@frontend/api';

import { FlashcardsSetForm, formSchema } from '../components';
import { LANGUAGE_LABELS } from '@flashcards/utils';

export const UpdateFlashcardsSetPage = ({ flashcardsSet }: { flashcardsSet: FlashcardsSet }) => {
  const defaultValues: InferType<typeof formSchema> = {
    destinationLanguage: {
      value: flashcardsSet.targetLanguage,
      label: LANGUAGE_LABELS[flashcardsSet.targetLanguage],
    },
    originalLanguage: {
      value: flashcardsSet.originalLanguage,
      label: LANGUAGE_LABELS[flashcardsSet.originalLanguage],
    },
    name: flashcardsSet.name,
    flashcards: Object.keys(flashcardsSet.flashcards).map((key) => ({
      term: key,
      translation: flashcardsSet.flashcards[key],
    })),
  };

  return <FlashcardsSetForm defaultValues={defaultValues} id={flashcardsSet.id} />;
};
