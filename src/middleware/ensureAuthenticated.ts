import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

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
    const { sub: user_id } = verify(token, '8a9c48b47ef1fcab5dadad189428e2fe') as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    request.user = {
      id: user_id
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
