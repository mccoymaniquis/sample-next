export type ResultsT<T> = {
  status: number;
  data?: T;
  message: string;
};

export type Decoded = {
  isUserChangedPassword: boolean;
  sub: string;
  iat: number;
  exp: number;
};

export type LoginResponse = {
  token: string;
};
