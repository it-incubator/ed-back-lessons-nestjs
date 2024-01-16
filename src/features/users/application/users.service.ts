import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../infrastructure/users.repository';
import { User, UserModelType } from '../domain/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//DI
const userRepo = new UsersRepository();

const userService = new UsersService(userRepo, {});

// Для провайдера всегда необходимо применять декоратор @Injectable() и регистрировать в модуле
@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    @InjectModel(User.name) private UserModel: UserModelType,
  ) {}

  async create(email: string, name: string) {
    //const user = User.create(name, email);
    this.UserModel.createUser('', '');
    const user = new this.UserModel({});
    user.name = 'new name';

    return this.usersRepository.insert(user);
  }

  async sendMessageOnEmail(email: string, message: string) {
    // this.emailAdapter.send(message);

    return true;
  }
}
