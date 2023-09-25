import cookieParser from 'cookie-parser';
import cors from 'cors';

import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router will be here
// app.use('/api/v1');

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

// global error handler will be here

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
export default app;
