'use server';
import { revalidatePath } from 'next/cache';

import { ServerActionResponse } from './types';

import { handleAxiosErrors, routes } from '@frontend/utils';
import { CreateFlashcardSetPayload, createFlashcardSet, deleteFlashcardSet } from '@frontend/api';

export async function deleteFlashcardSetAction(id: string): Promise<ServerActionResponse> {
  try {
    await deleteFlashcardSet(id);

    revalidatePath(routes.FLASHCARDS.url);

    return {
      success: true,
    };
  } catch (e) {
    const error = handleAxiosErrors(e);

    return {
      success: false,
      error: error,
    };
  }
}

export async function createFlashcardsSetAction(
  formData: CreateFlashcardSetPayload
): Promise<ServerActionResponse> {
  try {
    await createFlashcardSet(formData);

    revalidatePath(routes.FLASHCARDS.url);

    return {
      success: true,
    };
  } catch (e) {
    const error = handleAxiosErrors(e);

    return {
      success: false,
      error: error,
    };
  }
}
