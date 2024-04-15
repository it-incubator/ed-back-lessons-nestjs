import {Module} from '@nestjs/common';
import {AuthController} from "./api/auth.controller";
import {AuthService} from "./application/auth.service";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
