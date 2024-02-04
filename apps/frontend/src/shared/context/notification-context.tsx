'use client';

import {
  createContext,
  ReactNode,
  useContext,
  RefObject,
  useRef,
  useState,
  createRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NotificationProps } from '@frontend/components';

export interface Notification extends Omit<NotificationProps, 'hideNotification'> {
  ref: RefObject<HTMLDivElement>;
}

export const NotificationsContext = createContext<{
  notifications: Notification[];
  showNotification: (type: Notification['type'], message: Notification['message']) => void;
  hideNotification: (id: string) => void;
}>({
  notifications: [],
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (type: Notification['type'], message: Notification['message']) => {
    setNotifications((prev) => [
      ...prev,
      { id: uuidv4(), type, message, ref: createRef<HTMLDivElement>() },
    ]);
  };

  const hideNotification = (id: string) => {
    setNotifications((prev) => [...prev].filter((notification) => notification.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
