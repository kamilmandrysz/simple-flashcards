import Link from 'next/link';

import { routes } from '@frontend/utils';
import { Dropdown } from '@frontend/components/Dropdowns';
import { DefaultLayout } from '@frontend/layouts';

export default async function Index() {
  return (
    <DefaultLayout>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Link href={routes.SIGN_IN.url} prefetch={false}>
          Sign in
        </Link>
        {/* <Dropdown button="elo" children={[<p>dupa</p>, <p>cwel</p>]} /> */}
      </div>
    </DefaultLayout>
  );
}
