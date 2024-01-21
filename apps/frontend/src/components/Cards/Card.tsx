import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export const Card = ({ as: Component = 'div', children, className }: Props) => {
  return (
    <Component className={clsx('sx:px-6 rounded-lg bg-white px-4 py-5 shadow', className)}>
      {children}
    </Component>
  );
};
