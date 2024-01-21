import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = { actions?: ReactNode; className?: string; heading: ReactNode };

export const CardHeader = ({ actions, className, heading }: Props) => {
  return (
    <div className={className}>
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          {typeof heading === 'string' ? (
            <h3 className="text-base font-semibold leading-6 text-gray-900">{heading}</h3>
          ) : (
            heading
          )}
        </div>
        {actions ? <div className="ml-4 mt-2 flex flex-shrink-0 gap-3">{actions}</div> : null}
      </div>
    </div>
  );
};
