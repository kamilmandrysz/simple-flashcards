'use client';

import { useEffect, useMemo } from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

export type NotificationProps = {
  id: string;
  type?: 'success' | 'warning' | 'error';
  message?: string;
  hideNotification: (id: string) => void;
};

export const Notification = ({
  id,
  message,
  type = 'success',
  hideNotification,
}: NotificationProps) => {
  const renderIcon = useMemo(() => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />;
      case 'error':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />;
    }
  }, [type]);

  useEffect(() => {
    setTimeout(() => {
      hideNotification(id);
    }, 4000);
  }, []);

  return (
    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{renderIcon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 "
              onClick={() => hideNotification(id)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
