import clsx from 'clsx';

type Props = {
  className: string;
};

export const Skeleton = ({ className }: Props) => (
  <div className={clsx('animate-pulse rounded-full bg-gray-200 ', className)} />
);
