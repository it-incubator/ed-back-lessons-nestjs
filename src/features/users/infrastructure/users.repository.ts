import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument, UserModelType} from "../domain/user.entity";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private UserModel: UserModelType) {
    }

    public async create(email: string, name: string): Promise<UserDocument> {
        const user: UserDocument = this.UserModel.createUser(name, email);

        return this.save(user);
    }

    public async save(user: UserDocument): Promise<UserDocument> {
        return user.save();
    }
}
