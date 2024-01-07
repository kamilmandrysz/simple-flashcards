'use client';

import { forwardRef, ReactNode, InputHTMLAttributes, ForwardedRef } from 'react';
import clsx from 'clsx';

export type BaseTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  inputClassName?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export const BaseTextField = forwardRef(
  (
    { error, inputClassName, label, leading, trailing, ...rest }: BaseTextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className="relative mt-1.5">
      {label ? (
        <label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
          {label}
        </label>
      ) : null}
      {leading ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{leading}</span>
        </div>
      ) : null}
      <input
        ref={ref}
        className={clsx(
          'ring-secondary focus:ring-primary block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
          { 'pl-7': !!leading },
          { 'pr-12': !!trailing },
          {
            'text-red-900  !ring-red-300 placeholder:text-red-300 focus:ring-red-500': !!error,
          },
          inputClassName
        )}
        {...rest}
      />
      {trailing ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{trailing}</span>
        </div>
      ) : null}
      <p className="mt-1 text-xs text-red-600">{error}</p>
    </div>
  )
);
