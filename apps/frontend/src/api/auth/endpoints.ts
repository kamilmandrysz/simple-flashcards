import { API } from '..';
import {
  CreateUserPayload,
  CreateUserResponse,
  SignInUserPayload,
  SignInUserResponse,
  User,
} from './types';

const controller = 'auth';

export const signUpUser = (formData: CreateUserPayload) => {
  return API.post<CreateUserResponse>(`${controller}/signup`, formData);
};

export const signInUser = (formData: SignInUserPayload) => {
  return API.post<SignInUserResponse>(`${controller}/signin`, formData);
};

export const getProfile = () => {
  return API.get<User>(`${controller}/profile`);
};
