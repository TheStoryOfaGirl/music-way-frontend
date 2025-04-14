export type UserRole = "student" | "teacher";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
};

export type LoginData = {
  login: string;
  password: string;
};

export type RegisterData = LoginData & {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  repeatPassword: string;
};
