'use client';

import { createRef, RefObject, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Notification } from './';

import { useNotifications } from '@frontend/shared/context/notification-context';

export function NotificationArea() {
  const { notifications, hideNotification } = useNotifications();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-40 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <TransitionGroup
        component="div"
        className="flex w-full flex-col items-center space-y-4 sm:items-end"
      >
        {notifications.map((notification) => (
          <CSSTransition
            key={notification.id}
            timeout={300}
            classNames="transition"
            nodeRef={notification.ref}
          >
            <Notification
              ref={notification.ref}
              id={notification.id}
              message={notification.message}
              type={notification.type}
              hideNotification={hideNotification}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
