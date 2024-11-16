import { type Response, type Request } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    const { password } = request.body;

    const resetPasswordUserUsecase = container.resolve(ResetPasswordUserUseCase);

    await resetPasswordUserUsecase.execute({ password, token: String(token) });

    return response.send();
  }
}

export { ResetPasswordUserController };
