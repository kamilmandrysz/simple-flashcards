import { API } from '..';
import { CreateUserPayload, CreateUserResponse } from './types';

const controller = 'auth';

export const signUpUser = (formData: CreateUserPayload) => {
  return API.post<CreateUserResponse>(`${controller}/signup`, formData);
};
