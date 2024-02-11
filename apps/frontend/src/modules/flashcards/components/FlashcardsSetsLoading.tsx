import { Card, PageHeadingWithAction, Skeleton } from '@frontend/components';

export const FlashcardsSetsLoading = () => {
  return (
    <>
      <PageHeadingWithAction heading="Flashcards sets" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card className="col-span-1" key={index}>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="mb-3 mt-4 h-7 w-24" />
            <Skeleton className="h-5 w-16" />
          </Card>
        ))}
      </div>
    </>
  );
};
