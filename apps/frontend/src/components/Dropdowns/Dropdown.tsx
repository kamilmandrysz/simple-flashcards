'use client';

import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type Props = {
  button: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Dropdown({ children, button, className }: Props) {
  return (
    <Menu as="div" className="relative mb-[-2px] inline-block text-left">
      <Menu.Button
        className={
          className ||
          'ring-primary inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset transition-colors hover:bg-slate-50'
        }
      >
        {button}
        {typeof button === 'string' ? (
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        ) : null}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 hover:cursor-pointer focus:outline-none">
          <div className="py-1">
            {Array.isArray(children) ? (
              children.map((child, index) => (
                <Menu.Item key={index}>
                  <div className="px-4 py-2 hover:bg-slate-50">{child}</div>
                </Menu.Item>
              ))
            ) : (
              <Menu.Item>
                <div className="px-4 py-2 hover:bg-slate-50">{children}</div>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
