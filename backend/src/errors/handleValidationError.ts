import { Prisma } from '@prisma/client';

const handleValidationError = (error: Prisma.PrismaClientValidationError) => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
