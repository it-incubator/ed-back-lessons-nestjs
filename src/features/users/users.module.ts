import {Module} from '@nestjs/common';
import {UsersController} from "./api/users.controller";
import {UsersService} from "./application/users.service";
import {UsersRepository} from "./infra/users.repository";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService]
})
export class UsersModule {
}
