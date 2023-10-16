export type IRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
