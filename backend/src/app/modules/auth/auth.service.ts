import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JWtHelpers } from '../../../helpers/jwtHelper';
import prismaDb from '../../../shared/prismaDb';
import { IRegisterUser } from './auth.interface';
import bcrypt from 'bcrypt';
const register = async (user: IRegisterUser) => {
  const { email, name, password } = user;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   create new user to db
  const newUser = await prismaDb.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });

  const { id: userId } = newUser;

  // generate access token
  const accessToken = JWtHelpers.createToken(
    { id: userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  // generate refresh token
  const refreshToken = JWtHelpers.createToken(
    { id: userId },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: newUser,
  };
};

export const AuthService = {
  register,
};
