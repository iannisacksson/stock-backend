import { Response } from 'express';

export function sendError(
  response: Response,
  message: string,
  status = 200,
): void {
  response.status(status).json({
    success: false,
    error: {
      message,
      status,
    },
  });
}

export function sendSuccessful(
  response: Response,
  data: any,
  status = 200,
): void {
  response.status(status).json({
    success: true,
    data,
  });
}
