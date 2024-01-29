import { PencilIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CircleFlag } from 'react-circle-flags';
import Link from 'next/link';

import { Card, CardHeader, IconButton, PageHeadingWithAction } from '@frontend/components';
import { routes } from '@frontend/utils';

export const FlashcardsPage = () => {
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
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader
            heading="Module 2"
            actions={
              <>
                <IconButton className="!shadow-none" color="transparent">
                  <PencilIcon className="text-primary-dark h-5 w-5" />
                </IconButton>
                <IconButton className="!shadow-none" color="transparent">
                  <TrashIcon className="text-primary-dark h-5 w-5" />
                </IconButton>
              </>
            }
          />
          <div className="mb-3 mt-4 flex items-center gap-1">
            <CircleFlag countryCode="pl" className="h-7 w-7" />
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            <CircleFlag countryCode="gb" className="h-7 w-7" />
          </div>

          <p className="text-sm font-semibold">10 terms</p>
        </Card>
        <Card>
          <CardHeader
            heading="Module 2"
            actions={
              <>
                <IconButton className="!shadow-none" color="transparent">
                  <PencilIcon className="text-primary-dark h-5 w-5" />
                </IconButton>
                <IconButton className="!shadow-none" color="transparent">
                  <TrashIcon className="text-primary-dark h-5 w-5" />
                </IconButton>
              </>
            }
          />
          <div className="mb-3 mt-4 flex items-center gap-1">
            <CircleFlag countryCode="pl" className="h-7 w-7" />
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            <CircleFlag countryCode="gb" className="h-7 w-7" />
          </div>

          <p className="text-sm font-semibold">10 terms</p>
        </Card>
        <Card>
          <CardHeader
            heading="Module 2"
            actions={
              <>
                <IconButton className="!shadow-none" color="transparent">
                  <PencilIcon className="text-primary-dark h-5 w-5" />
                </IconButton>
                <IconButton className="!shadow-none" color="transparent">
                  <TrashIcon className="text-primary-dark h-5 w-5" />
                </IconButton>
              </>
            }
          />
          <div className="mb-3 mt-4 flex items-center gap-1">
            <CircleFlag countryCode="pl" className="h-7 w-7" />
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            <CircleFlag countryCode="gb" className="h-7 w-7" />
          </div>

          <p className="text-sm font-semibold">10 terms</p>
        </Card>
      </ul>
    </>
  );
};
