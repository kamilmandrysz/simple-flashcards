import { HttpStatusCode } from 'axios';

interface BaseError {
  status: HttpStatusCode;
}

interface UnprocessableEntityResponseError extends BaseError {
  status: HttpStatusCode.UnprocessableEntity;
  errors: Record<string, string>;
}

interface BaseResponseError extends BaseError {
  status: Exclude<HttpStatusCode, HttpStatusCode.UnprocessableEntity>;
  error?: string;
  message?: string;
}

export type ApiResponseError = UnprocessableEntityResponseError | BaseResponseError;
