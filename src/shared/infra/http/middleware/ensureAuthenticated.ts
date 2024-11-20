import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string
}

export async function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const tokenHeader = request.headers.authorization;

  if (!tokenHeader) {
    throw new AppError('token missing', 401);
  }

  const [, token] = tokenHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
