import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = { actions?: ReactNode; className?: string; heading: ReactNode };

export function PageHeadingWithAction({ actions, heading, className }: Props) {
  return (
    <div className={clsx('mb-10 md:flex md:items-center md:justify-between', className)}>
      <div className="min-w-0 flex-1">
        {typeof heading === 'string' ? (
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {heading}
          </h2>
        ) : (
          heading
        )}
      </div>
      {actions ? <div className="mt-4 flex md:ml-4 md:mt-0">{actions}</div> : null}
    </div>
  );
}
