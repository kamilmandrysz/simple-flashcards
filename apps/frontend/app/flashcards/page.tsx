import Link from 'next/link';

import { routes } from '@frontend/utils';

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold underline">Flashcards</h1>
      <Link href={routes.HOME.url} prefetch={false}>
        Homepage
      </Link>
    </div>
  );
}
