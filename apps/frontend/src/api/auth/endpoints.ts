import { API } from '..';
import {
  CreateUserPayload,
  CreateUserResponse,
  SignInUserPayload,
  SignInUserResponse,
} from './types';

const controller = 'auth';

export const signUpUser = (formData: CreateUserPayload) => {
  return API.post<CreateUserResponse>(`${controller}/signup`, formData);
};

export const signInUser = (formData: SignInUserPayload) => {
  return API.post<SignInUserResponse>(`${controller}/signin`, formData);
};
