export type IRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
};
