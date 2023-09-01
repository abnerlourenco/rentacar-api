import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string
}

export async function ensureAuthenticated (request: Request, response: Response, next: NextFunction): Promise<void> {
  const tokenHeader = request.headers.authorization;

  if (!tokenHeader) {
    throw new Error('token missing');
  }

  const [, token] = tokenHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '8a9c48b47ef1fcab5dadad189428e2fe') as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exist');
    }

    next();
  } catch (error) {
    throw new Error('Invalid token!');
  }
}
