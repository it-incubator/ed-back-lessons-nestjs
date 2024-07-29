import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailIsExistConstraint } from './common/decorators/validate/email-is-exist.decorator';
import { LoginIsExistConstraint } from './common/decorators/validate/login-is-exist.decorator';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthService } from './features/auth/application/auth.service';
import { UsersController } from './features/users/api/users.controller';

import { UsersService } from './features/users/application/users.service';
import { User, UserSchema } from './features/users/domain/user.entity';
import { UsersQueryRepository } from './features/users/infrastructure/users.query-repository';
import { UsersRepository } from './features/users/infrastructure/users.repository';
import { AppSettings, appSettings } from './settings/app-settings';

@Module({
    // Регистрация модулей
    imports: [
        //CqrsModule,
        // ConfigModule.forRoot({
        //     isGlobal: true,
        //     load: [configuration],
        //     validate: validate,
        //     ignoreEnvFile:
        //         process.env.ENV !== Environments.DEVELOPMENT && process.env.ENV !== Environments.TEST,
        //     envFilePath: ['.env.development', '.env']
        // }),

        // work with nest ConfigModule
        // MongooseModule.forRootAsync({
        //     useFactory: (configService: ConfigService<ConfigurationType>) => {
        //         const environmentSettings = configService.get('environmentSettings', {
        //             infer: true,
        //         });
        //         const databaseSettings = configService.get('databaseSettings', {
        //             infer: true,
        //         });

        //         const uri = environmentSettings.isTesting
        //             ? databaseSettings.DB_TEST_CONNECTION_URI
        //             : databaseSettings.DB_DEVELOPMENT_CONNECTION_URI;
        //         console.log(uri);

        //         return {
        //             uri: uri,
        //         };
        //     },
        //     inject: [ConfigService],
        // }),
        MongooseModule.forRoot(appSettings.env.isTesting()
            ? appSettings.api.MONGO_CONNECTION_URI_FOR_TESTS
            : appSettings.api.MONGO_CONNECTION_URI),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    // Регистрация провайдеров
    providers: [
        UsersRepository,
        UsersService,
        UsersQueryRepository,
        LoginIsExistConstraint,
        EmailIsExistConstraint,
        AuthService,
        {
            provide: AppSettings,
            useClass: AppSettings,
        },
        /*{
                    provide: UsersService,
                    useValue: {method: () => {}},

                },*/
        // Регистрация с помощью useFactory (необходимы зависимости из ioc, подбор провайдера, ...)
        /* {
                    provide: UsersService,
                    useFactory: (repo: UsersRepository) => {
                        return new UsersService(repo);
                    },
                    inject: [UsersRepository]
                }*/
    ],
    // Регистрация контроллеров
    controllers: [UsersController],
})
export class AppModule implements NestModule {
    // https://docs.nestjs.com/middleware#applying-middleware
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
