import { API } from '..';
import { CreateFlashcardSetPayload, CreateFlashcardSetResponse } from './types';

const controller = 'flashcards-set';

export const createFlashcardSet = (formData: CreateFlashcardSetPayload) => {
  return API.post<CreateFlashcardSetResponse>(`${controller}`, formData);
};
