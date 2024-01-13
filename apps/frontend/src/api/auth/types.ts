export type CreateUserPayload = {
  email: string;
  username: string;
  password: string;
};

export type CreateUserResponse = User;

export type User = {
  id: string;
  username: string;
  email: string;
};
