import {Injectable} from '@nestjs/common';
import {UsersService} from "../../users/application/users.service";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {
    }


    async method() {
        return true;
    }

    async registration(name: string) {
        // registration logic (send email...)

        await this.usersService.create(name);
    }

}
