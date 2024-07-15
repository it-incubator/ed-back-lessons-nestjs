import {Module, Provider,} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppSettings, appSettings} from './settings/app-settings';
import {UsersRepository} from './features/users/infrastructure/users.repository';
import {UsersService} from './features/users/application/users.service';
import {UsersQueryRepository} from './features/users/infrastructure/users.query-repository';
import {User, UserSchema} from './features/users/domain/user.entity';
import {UsersController} from './features/users/api/users.controller';
import {AuthService} from "./features/auth/application/auth.service";

const usersProviders: Provider[] = [
    UsersRepository,
    UsersService,
    UsersQueryRepository,
];

@Module({
    // Регистрация модулей
    imports: [
        MongooseModule.forRoot(appSettings.api.MONGO_CONNECTION_URI),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    // Регистрация провайдеров
    providers: [
        ...usersProviders,
        AuthService,
        {
            provide: AppSettings,
            useValue: appSettings,

        },
    ],
    // Регистрация контроллеров
    controllers: [UsersController],
})
export class AppModule {
}
