import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

import { CircularLoader } from '../Loaders';

export const Button = ({
  children,
  className,
  color = 'primary',
  disabled,
  isLoading = false,
  leading,
  size = 'xl',
  trailing,
  variant = 'contained',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary';
  isLoading?: boolean;
  leading?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  trailing?: ReactNode;
  variant?: 'contained' | 'outlined';
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex w-fit items-center justify-center gap-x-1.5 rounded-md text-center font-semibold shadow-sm transition-all duration-300 disabled:cursor-not-allowed',
        { 'px-2 py-1 text-xs': size === 'xs' },
        { 'px-2 py-1 text-sm': size === 'sm' },
        { 'px-2.5 py-1.5 text-sm': size === 'md' },
        { 'px-3 py-2 text-sm': size === 'lg' },
        { 'px-3.5 py-2.5 text-sm': size === 'xl' },
        {
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
            variant === 'contained',
        },
        {
          'ring-2 ring-inset': variant === 'outlined',
        },
        {
          'bg-primary hover:bg-secondary focus-visible:outline-primary text-white disabled:bg-slate-400':
            color === 'primary' && variant === 'contained',
        },
        {
          'ring-primary hover:ring-secondary hover:text-secondary text-primary disabled:text-slate-400 disabled:ring-slate-400':
            color === 'primary' && variant === 'outlined',
        },
        { '!text-transparent': isLoading },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {leading ? <div className={clsx('-ml-0.5', { hidden: isLoading })}>{leading}</div> : null}
      {children}
      {trailing ? <div className={clsx('-mr-0.5', { hidden: isLoading })}>{trailing}</div> : null}
      {isLoading ? (
        <CircularLoader
          className={clsx(
            'text-transparent',
            { 'h-4 w-4': size === 'xs' },
            { 'h-5 w-5': size === 'sm' },
            { 'h-6 w-6': size === 'md' },
            { 'h-6 w-6': size === 'lg' },
            { 'h-7 w-7': size === 'xl' },
            {
              'fill-white': color === 'primary' && variant === 'contained',
            },
            {
              'fill-primary disabled:fill-slate-400': color === 'primary' && variant === 'outlined',
            },
            {
              'fill-slate-400': color === 'primary' && variant === 'outlined' && disabled,
            }
          )}
          containerClassName="inset-center"
        />
      ) : null}
    </button>
  );
};
