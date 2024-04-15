import {Injectable} from '@nestjs/common';

@Injectable()
export class UsersRepository {
    async create(name: string) {
        return {
            name: name
        };
    }

}
