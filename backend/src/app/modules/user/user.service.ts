import prismaDb from '../../../shared/prismaDb';
import { IUser } from './user.interface';

const getUsers = async (email?: string): Promise<IUser[]> => {
  const users = await prismaDb.user.findMany({
    where: {
      email: email,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });

  return users;
};

export const UserService = {
  getUsers,
};
