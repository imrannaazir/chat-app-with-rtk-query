import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JWtHelpers } from '../../../helpers/jwtHelper';
import prismaDb from '../../../shared/prismaDb';
import {
  ILoginUser,
  ILoginUserResponse,
  IRegisterUser,
} from './auth.interface';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

//register service
const register = async (
  user: IRegisterUser,
): Promise<ILoginUserResponse | null> => {
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

//login service
const login = async (
  payload: ILoginUser,
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  //  check is user exist
  const isUserExist = await prismaDb.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist!');
  }

  // check valid password
  const isValidPassword = await bcrypt.compare(password, isUserExist.password);

  if (!isValidPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  //generate access token
  const accessToken = JWtHelpers.createToken(
    { id: isUserExist.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  //generate refresh token
  const refreshToken = JWtHelpers.createToken(
    { id: isUserExist },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      email: isUserExist.email,
      id: isUserExist.id,
      name: isUserExist.name,
    },
  };
};

export const AuthService = {
  register,
  login,
};
