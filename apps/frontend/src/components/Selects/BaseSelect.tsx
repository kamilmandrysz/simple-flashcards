'use client';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export type SelectOption = {
  label: string | number;
  value: string | number;
};

export type BaseSelectProps = {
  className?: string;
  error?: string;
  label?: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (selected: SelectOption) => void;
};

export function BaseSelect({ className, error, label, options, value, onChange }: BaseSelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="input-container">
          {label ? <Listbox.Label className="input-label">{label}</Listbox.Label> : null}
          <Listbox.Button
            className={clsx(
              'input-field relative',
              {
                'input-field-error': !!error,
              },
              className
            )}
          >
            <span className="block truncate pe-10 ps-4 text-start">{value?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    clsx(
                      active ? 'bg-primary text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {option.label}
                      </span>

                      {selected ? (
                        <span
                          className={clsx(
                            active ? 'text-white' : 'text-primary',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          <p className="text-error">{error}</p>
        </div>
      )}
    </Listbox>
  );
}
