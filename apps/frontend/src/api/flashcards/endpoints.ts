import { API } from '..';
import {
  CreateFlashcardSetPayload,
  CreateFlashcardSetResponse,
  GetFlashcardsSetsResponse,
} from './types';

const controller = 'flashcards-set';

export const createFlashcardSet = (formData: CreateFlashcardSetPayload) => {
  return API.post<CreateFlashcardSetResponse>(`${controller}`, formData);
};

export const getFlashcardSets = async (): Promise<GetFlashcardsSetsResponse[]> => {
  try {
    const response = await API.get<GetFlashcardsSetsResponse[]>(`${controller}`);

    return response.data;
  } catch (e) {
    return [];
  }
};

export const deleteFlashcardSet = (id: string) => {
  return API.delete<CreateFlashcardSetResponse>(`${controller}/${id}`);
};
