import { Card, CardHeader, PageHeadingWithAction, Skeleton } from '@frontend/components';

export const FlashcardsSetUpdateLoading = () => {
  return (
    <>
      <PageHeadingWithAction heading="Update Flashcards set" />
      <div className="mb-8 flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <Card className="col-span-1" key={index}>
            <CardHeader heading={index + 1} className="mb-6 border-b pb-2" />
            <div className="flex flex-col gap-4 md:flex-row">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
