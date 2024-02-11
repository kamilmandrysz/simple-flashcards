'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon, TrashIcon, ChevronRightIcon, FolderPlusIcon } from '@heroicons/react/20/solid';
import { CircleFlag } from 'react-circle-flags';

import { Card, CardHeader, IconButton, PageHeadingWithAction } from '@frontend/components';
import { getFlagCode, handleFormErrors, routes } from '@frontend/utils';
import { FlashcardsSetInformation, deleteFlashcardSet } from '@frontend/api';
import AlertDialog from '@frontend/components/Notifications/AlertDialog';
import { useNotifications } from '@frontend/shared/context';

type Props = {
  flashcardsSets: FlashcardsSetInformation[];
};

export function FlashcardsPage({ flashcardsSets }: Props) {
  const router = useRouter();
  const { showNotification } = useNotifications();
  const [deleteSetAlertOpen, setDeleteSetAlertOpen] = useState(false);
  const [deleteSetAlertData, setDeleteSetAlertData] = useState<FlashcardsSetInformation | null>(
    null
  );
  const [deleteSetAlertLoading, setDeleteSetAlertLoading] = useState(false);

  const onDeleteFlashcardClick = (flashcardSet: FlashcardsSetInformation) => {
    setDeleteSetAlertData(flashcardSet);
    setDeleteSetAlertOpen(true);
  };

  const onDialogClose = () => {
    setDeleteSetAlertData(null);
    setDeleteSetAlertOpen(false);
    setDeleteSetAlertLoading(false);
  };

  const onDeleteSet = async () => {
    if (!deleteSetAlertData) {
      showNotification('error', 'Something went wrong, try again later.');

      return;
    }

    setDeleteSetAlertLoading(true);

    try {
      await deleteFlashcardSet(deleteSetAlertData.id);

      showNotification('success', 'Flashcards set deleted successfully');
      router.refresh();
      onDialogClose();
    } catch (e) {
      handleFormErrors(e, showNotification);
    }
  };

  return (
    <>
      <PageHeadingWithAction
        heading="Flashcards sets"
        actions={
          <Link
            href={routes.ADD_FLASHCARD.url}
            className="btn btn-xl btn-contained btn-contained-primary"
          >
            Add set
          </Link>
        }
      />
      {flashcardsSets.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flashcardsSets.map((flashcardSet) => (
            <FlashcardSetCard
              key={flashcardSet.id}
              flashcardSet={flashcardSet}
              onDeleteFlashcardClick={onDeleteFlashcardClick}
            />
          ))}
        </ul>
      ) : (
        <EmptyState />
      )}

      <AlertDialog
        open={deleteSetAlertOpen}
        actionButtonLoading={deleteSetAlertLoading}
        actionButtonLabel="Delete"
        message="Are you sure you want to delete this set?"
        title="Delete set"
        onConfirm={onDeleteSet}
        onClose={onDialogClose}
      />
    </>
  );
}

const FlashcardSetCard = ({
  flashcardSet,
  onDeleteFlashcardClick,
}: {
  flashcardSet: FlashcardsSetInformation;
  onDeleteFlashcardClick: (flashcardSet: FlashcardsSetInformation) => void;
}) => {
  const router = useRouter();

  return (
    <Card as="li" className="col-span-1">
      <CardHeader
        heading={flashcardSet.name}
        actions={
          <>
            <IconButton
              className="!shadow-none"
              color="transparent"
              onClick={() => router.push(routes.FLASHCARD.url(flashcardSet.id))}
            >
              <PencilIcon className="text-primary-dark h-5 w-5" />
            </IconButton>
            <IconButton
              className="!shadow-none"
              color="transparent"
              onClick={() => onDeleteFlashcardClick(flashcardSet)}
            >
              <TrashIcon className="text-primary-dark h-5 w-5" />
            </IconButton>
          </>
        }
      />
      <div className="mb-3 mt-4 flex items-center gap-1">
        <CircleFlag countryCode={getFlagCode(flashcardSet.originalLanguage)} className="h-7 w-7" />
        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        <CircleFlag countryCode={getFlagCode(flashcardSet.targetLanguage)} className="h-7 w-7" />
      </div>

      <p className="text-sm font-semibold">{`${flashcardSet.flashcardsCount} ${
        flashcardSet.flashcardsCount === 1 ? 'term' : 'terms'
      }`}</p>
    </Card>
  );
};

const EmptyState = () => (
  <div className="mt-16 text-center md:mt-24">
    <FolderPlusIcon className="mx-auto h-20 w-20 text-gray-400" />
    <h3 className="text-md mt-2 font-semibold text-gray-900">No flashcards sets</h3>
    <p className="text-md mt-1 text-gray-500">Get started by adding a new flashcards set.</p>
    <div className="mt-6">
      <Link
        href={routes.ADD_FLASHCARD.url}
        className="btn btn-xl btn-contained btn-contained-primary"
      >
        Add set
      </Link>
    </div>
  </div>
);
