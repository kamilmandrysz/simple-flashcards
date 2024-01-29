import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

import { CircularLoader } from '../Loaders';

export const IconButton = ({
  children,
  className,
  color = 'primary',
  disabled,
  isLoading = false,
  size = 'md',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'transparent';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'relative w-fit rounded-full  p-1  shadow-sm  transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
        { 'p-1': size === 'sm' },
        { 'p-1.5': size === 'md' },
        { 'p-2': size === 'lg' },
        { '!text-transparent': isLoading },
        {
          'focus-visible:outline-primary bg-primary hover:bg-secondary text-white disabled:bg-slate-400':
            color === 'primary',
        },
        {
          'bg-transparent hover:bg-gray-50 focus-visible:outline-transparent disabled:text-slate-400 disabled:hover:bg-transparent':
            color === 'transparent',
        },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
      {isLoading ? (
        <CircularLoader
          className={clsx(
            'fill-white text-transparent',
            { 'h-5 w-5': size === 'sm' },
            { 'h-6 w-6': size === 'md' },
            { 'h-7 w-7': size === 'lg' }
          )}
          containerClassName="inset-center"
        />
      ) : null}
    </button>
  );
};
