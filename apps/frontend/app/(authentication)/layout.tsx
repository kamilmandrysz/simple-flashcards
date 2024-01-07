import { ReactNode } from 'react';

import { Learning } from '@flashcards/icons';

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-slate-100 px-5">
      <div className="flex w-full max-w-[500px] rounded-2xl bg-white shadow-lg lg:max-w-[1000px]">
        <div className="my-10 hidden w-2/4 lg:flex">
          <Learning />
        </div>
        <div className="flex w-full lg:w-2/4">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
