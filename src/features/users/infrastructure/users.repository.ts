import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../domain/user.entity';
import {UserOutputModel, UserOutputModelMapper} from "../api/models/output/user.output.model";

//TODO: add save method

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async insert(user: { email: string; name: string }) {
    const result = await this.userModel.insertMany(user);
    return result[0];
  }

  public async nameIsExist(name: string) {
    const result = await this.userModel.count({ name: name });
    return result > 0;
  }

  public async getById(userId: string): Promise<User> {
    return this.userModel.findById(userId, { __v: false });
  }
}
