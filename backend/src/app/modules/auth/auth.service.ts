import prismaDb from '../../../shared/prismaDb';
import sendResponse from '../../../shared/sendResponse';
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
  });
  console.log(newUser);
};

export const AuthService = {
  register,
};
