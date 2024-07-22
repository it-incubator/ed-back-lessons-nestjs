import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NameIsExistConstraint } from './common/decorators/validate/name-is-exist.decorator';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthService } from './features/auth/application/auth.service';
import { UsersController } from './features/users/api/users.controller';
import { UsersService } from './features/users/application/users.service';
import { User, UserSchema } from './features/users/domain/user.entity';
import { UsersQueryRepository } from './features/users/infrastructure/users.query-repository';
import { UsersRepository } from './features/users/infrastructure/users.repository';
import { AppSettings, appSettings } from './settings/app-settings';

const usersProviders: Provider[] = [
  UsersRepository,
  UsersQueryRepository,
];

@Module({
  // Регистрация модулей
  imports: [
    MongooseModule.forRoot(
      appSettings.env.isTesting()
        ? appSettings.api.MONGO_CONNECTION_URI_FOR_TESTS
        : appSettings.api.MONGO_CONNECTION_URI,
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // Регистрация провайдеров
  providers: [
    ...usersProviders,
    NameIsExistConstraint,
    AuthService,
    {
      provide: AppSettings,
      useValue: appSettings,

    },
    /* {
            provide: UsersService,
            useClass: UsersService,
        },*/
    /*{
            provide: UsersService,
            useValue: {method: () => {}},

        },*/
    // Регистрация с помощью useFactory (необходимы зависимости из ioc, подбор провайдера, ...)
    {
      provide: UsersService,
      useFactory: (repo: UsersRepository, authService: AuthService) => {
        return new UsersService(repo, authService);
      },
      inject: [UsersRepository, AuthService]
    }
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
