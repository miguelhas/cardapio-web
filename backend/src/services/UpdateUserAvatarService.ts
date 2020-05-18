import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';

interface Request {
  user_id: string;
  avatarFilename: string;
}
/**
 * @class UpdateUserAvatarService usada no update para UserAvatarService
 */
class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if(user.avatar){
      /**
       * @description
       * deletar avatar anterior 0- verificar se ele já tinha avatar.
       * buscar pelo  arquivo de avatar do usuario
       */
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      /**
       * @description
       * verifica se existe e deleta.
       */
      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
