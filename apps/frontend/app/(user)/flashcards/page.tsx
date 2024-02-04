import { Suspense } from 'react';

import { FlashcardsPage } from '@frontend/modules/flashcards/pages';
import { getFlashcardSets } from '@frontend/api';
import { FlashcardsSetsLoading } from '@frontend/modules/flashcards';

export default async function Page() {
  return (
    <Suspense fallback={<FlashcardsSetsLoading />}>
      <FlashcardsSetsPage />
    </Suspense>
  );
}

async function FlashcardsSetsPage() {
  const flashcardsSets = await getFlashcardSets();

  return <FlashcardsPage flashcardsSets={flashcardsSets} />;
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';
