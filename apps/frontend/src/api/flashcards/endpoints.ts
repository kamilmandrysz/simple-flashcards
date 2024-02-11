import { API } from '..';
import {
  FlashcardSetFormPayload,
  CreateFlashcardSetResponse,
  GetFlashcardsSetResponse,
  GetFlashcardsSetsResponse,
  UpdateFlashcardsSetResponse,
} from './types';

const controller = 'flashcards-set';

/* -------------------------------------------------------------------------- */

export const createFlashcardSet = (formData: FlashcardSetFormPayload) => {
  return API.post<CreateFlashcardSetResponse>(`${controller}`, formData);
};

/* -------------------------------------------------------------------------- */

export const updateFlashcardSet = (id: string, formData: FlashcardSetFormPayload) => {
  return API.patch<UpdateFlashcardsSetResponse>(`${controller}/${id}`, formData);
};

/* -------------------------------------------------------------------------- */

export const getFlashcardSets = async (): Promise<GetFlashcardsSetsResponse[]> => {
  try {
    const response = await API.get<GetFlashcardsSetsResponse[]>(`${controller}`);

    return response.data;
  } catch (e) {
    return [];
  }
};

/* -------------------------------------------------------------------------- */

export const getFlashcardSet = async (id: string): Promise<GetFlashcardsSetResponse | null> => {
  try {
    const response = await API.get<GetFlashcardsSetResponse>(`${controller}/${id}`);

    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/* -------------------------------------------------------------------------- */

export const deleteFlashcardSet = (id: string) => {
  return API.delete<CreateFlashcardSetResponse>(`${controller}/${id}`);
};
