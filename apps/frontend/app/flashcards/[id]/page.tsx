export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Flashcard {params.id}</h1>
    </div>
  );
}
