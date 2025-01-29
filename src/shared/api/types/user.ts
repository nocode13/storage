export type User = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  role: Role;
};

export type Role = 'admin' | 'moderator';
