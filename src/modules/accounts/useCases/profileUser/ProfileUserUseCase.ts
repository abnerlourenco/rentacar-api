import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { type IUserResponseDTO } from '../../dtos/IUserResponseDTO';
import { UserMap } from '../../mapper/UserMap';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute (user_id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
