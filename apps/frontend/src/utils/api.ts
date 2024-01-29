import { HttpStatusCode, isAxiosError } from 'axios';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { Notification } from '@frontend/shared/context/notification-context';

interface BaseError {
  statusCode: HttpStatusCode;
}

interface UnprocessableEntityResponseError extends BaseError {
  statusCode: HttpStatusCode.UnprocessableEntity;
  errors: Record<string, string>;
}

interface BaseResponseError extends BaseError {
  statusCode: Exclude<HttpStatusCode, HttpStatusCode.UnprocessableEntity>;
  error?: string;
  message?: string;
}

export type ApiResponseError = UnprocessableEntityResponseError | BaseResponseError;

/* -------------------------------------------------------------------------- */

export const handleAxiosErrors = (err: unknown): ApiResponseError => {
  if (!isAxiosError(err) || !err.response?.data) {
    throw err;
  }

  return err.response.data;
};

/* -------------------------------------------------------------------------- */

export const handleFormErrors = (
  err: unknown,
  setError: UseFormSetError<FieldValues>,
  showNotification: (type: Notification['type'], message: Notification['message']) => void
) => {
  const error = handleAxiosErrors(err);

  if (error.statusCode === 422) {
    Object.keys(error.errors).forEach((key) => {
      setError(key, { message: error.errors[key] });
    });
  } else {
    showNotification('error', error?.message);
  }
};
