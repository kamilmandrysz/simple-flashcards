'use client';

import { forwardRef, ReactNode, InputHTMLAttributes, ForwardedRef } from 'react';
import clsx from 'clsx';

export type BaseTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  className?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export const BaseTextField = forwardRef(
  (
    { error, className, label, leading, trailing, ...rest }: BaseTextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className="input-container">
      {label ? <label className="input-label">{label}</label> : null}
      {leading ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{leading}</span>
        </div>
      ) : null}
      <input
        ref={ref}
        className={clsx(
          'input-field',
          { 'pl-7': !!leading },
          { 'pr-12': !!trailing },
          {
            'input-field-error': !!error,
          },
          className
        )}
        {...rest}
      />
      {trailing ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{trailing}</span>
        </div>
      ) : null}
      <p className="text-error">{error}</p>
    </div>
  )
);
