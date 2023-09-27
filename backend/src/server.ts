import { Server } from 'http';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const main = async () => {
  // server
  const server: Server = app.listen(config.port, () => {
    logger.info(`Server is running on Port - ${config.port}`);
  });

  //   exist handler
  const existHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Sever closed.');
      });
    }
    process.exit(1);
  };

  //   unexpected error handler
  const unexpectedErrorHandler = (error: unknown) => {
    errorLogger.error(error);
    existHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received.');
    if (server) {
      server.close();
    }
  });
};

main();
