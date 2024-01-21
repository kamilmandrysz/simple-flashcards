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
        'btn',
        { 'btn-xs': size === 'xs' },
        { 'btn-sm': size === 'sm' },
        { 'btn-md': size === 'md' },
        { 'btn-lg': size === 'lg' },
        { 'btn-xl': size === 'xl' },
        {
          'btn-contained': variant === 'contained',
        },
        {
          'btn-outlined': variant === 'outlined',
        },
        {
          'btn-contained-primary': color === 'primary' && variant === 'contained',
        },
        {
          'btn-outlined-primary': color === 'primary' && variant === 'outlined',
        },
        { '!text-transparent': isLoading },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {leading ? <div className={clsx('-ml-0.5', { invisible: isLoading })}>{leading}</div> : null}
      <div className={clsx({ invisible: isLoading })}>{children}</div>
      {trailing ? (
        <div className={clsx('-mr-0.5', { invisible: isLoading })}>{trailing}</div>
      ) : null}
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
