import {Injectable} from '@nestjs/common';
import {UsersRepository} from '../infrastructure/users.repository';

// Для провайдера всегда необходимо применять декоратор @Injectable() и регистрировать в модуле
@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {
    }

    async create(email: string, name: string) {
        const user = await this.usersRepository.create(email, name);

        // email send message
        // this.emailAdapter.send(message);

        return user.id;
    }
}