import { Response } from 'express';
import AppError from '@shared/errors/AppError';

export function sendError(
  response: Response,
  err: Error,
  message: string,
  status: number,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).status(status).json({
      success: false,
      error: {
        message,
        status,
      },
    });
  }

  console.error(err);

  return response.status(500).json({
    status: false,
    error: {
      message: 'Internal server error',
      status: 500,
    },
  });
}

export function sendSuccessful(res: Response, data: any, status = 200): void {
  res.status(status).json({
    success: true,
    data,
  });
}
