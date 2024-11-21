import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute ({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User is not found');
    }

    // Remover avatar antigo
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }
    // salvar no storage e gerar o link
    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
