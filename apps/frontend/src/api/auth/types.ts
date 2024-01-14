export type CreateUserPayload = {
  email: string;
  username: string;
  password: string;
};

export type CreateUserResponse = User;

/* -------------------------------------------------------------------------- */

export type SignInUserPayload = {
  emailOrUsername: string;
  password: string;
};

export type SignInUserResponse = {
  access_token: string;
  refresh_token: string;
};

export type RefreshTokenResponse = SignInUserResponse;

/* -------------------------------------------------------------------------- */

export type User = {
  id: string;
  username: string;
  email: string;
};
