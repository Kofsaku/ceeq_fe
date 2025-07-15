export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data: User;
};
