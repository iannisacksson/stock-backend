import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        status: err.statusCode,
      },
    });
  }

  console.error(err);

  return response.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      status: 500,
    },
  });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});
