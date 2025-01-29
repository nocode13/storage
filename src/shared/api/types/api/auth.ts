import { User } from '../user';

export type LoginRes = {
  access_token: string;
  user: User;
};

export type LoginBody = {
  username: string;
  password: string;
};
