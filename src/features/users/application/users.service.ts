import {Injectable} from '@nestjs/common';
import {UsersRepository} from "../infra/users.repository";

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository) {
    }

    async create(name: string) {
        // do logic

        return this.usersRepository.create(name);
    }

}
