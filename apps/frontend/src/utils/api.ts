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

export const DEFAULT_ERROR: BaseResponseError = {
  statusCode: HttpStatusCode.InternalServerError,
  message: 'Something went wrong, please try again later',
};

/* -------------------------------------------------------------------------- */

export const handleAxiosErrors = (error: unknown): ApiResponseError => {
  if (!isAxiosError(error) || !error.response?.data) {
    return DEFAULT_ERROR;
  }

  return error.response.data;
};

/* -------------------------------------------------------------------------- */

export const displayErrors = (
  error: ApiResponseError,
  showNotification: (type: Notification['type'], message: Notification['message']) => void,
  setError?: UseFormSetError<FieldValues>
) => {
  if (error.statusCode === 422) {
    if (!setError) {
      return;
    }

    Object.keys(error.errors).forEach((key) => {
      setError(key, { message: error.errors[key] });
    });
  } else {
    showNotification('error', error?.message || DEFAULT_ERROR.message);
  }
};

/* -------------------------------------------------------------------------- */

export const handleFormErrors = (
  error: unknown,
  showNotification: (type: Notification['type'], message: Notification['message']) => void,
  setError?: UseFormSetError<FieldValues>
) => {
  const parsedError = handleAxiosErrors(error);

  displayErrors(parsedError, showNotification, setError);
};
