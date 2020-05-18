import User from '../models/User';
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

class CreateUserService {
 public async execute({name, email, phone, address, password}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if(checkUserExists){
      throw new AppError('Email address already used.', 400);
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
