export type UserRole = "Ученик" | "Преподаватель";

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
};

export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthdate: string;
};

export type ChangePasswordData = {
  new_password: string;
};
