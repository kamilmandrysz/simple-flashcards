import { Button, Card, CardHeader, PageHeadingWithAction } from '@frontend/components';

export const FlashcardsPage = () => {
  return (
    <>
      <PageHeadingWithAction
        heading="Flashcards sets"
        actions={
          <Button color="primary" variant="contained">
            Add set
          </Button>
        }
      />
      <div>
        <Card>
          <CardHeader
            heading="Test"
            actions={
              <Button color="primary" variant="contained">
                Add set
              </Button>
            }
          />
        </Card>
      </div>
    </>
  );
};
