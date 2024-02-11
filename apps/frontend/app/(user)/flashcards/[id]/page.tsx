import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getFlashcardSet } from '@frontend/api';
import { FlashcardsSetUpdateLoading } from '@frontend/modules/flashcards';
import { UpdateFlashcardsSetPage } from '@frontend/modules/flashcards';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense key={params.id} fallback={<FlashcardsSetUpdateLoading />}>
      <FlashcardsSetsPage id={params.id} />
    </Suspense>
  );
}

async function FlashcardsSetsPage({ id }: { id: string }) {
  const flashcardsSet = await getFlashcardSet(id);

  if (!flashcardsSet) {
    notFound();
  }

  return <UpdateFlashcardsSetPage flashcardsSet={flashcardsSet} />;
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';
