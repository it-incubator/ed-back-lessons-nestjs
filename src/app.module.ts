import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './features/users/infrastructure/users.repository';
import { UsersService } from './features/users/application/users.service';
import { UsersQueryRepository } from './features/users/infrastructure/users.query-repository';
import { User, UserSchema } from './features/users/domain/user.entity';
import { UsersController } from './features/users/api/users.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { NameIsExistConstraint } from './common/decorators/validate/name-is-exist.decorator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { ConfigurationType } from './settings/configuration';
import { CqrsModule } from '@nestjs/cqrs';
import {
  UserCreatedEventHandler,
  UserCreatedEventHandler2,
} from './features/users/application/events/handlers/user-created.event-handler';
import { VeryBigCalculateQuery } from './features/users/infrastructure/queries/very-big-calculate';
import { CreateUserUseCase } from './features/users/application/usecases/create-user.usecase';

const usersProviders: Provider[] = [
  UsersRepository,
  UsersService,
  UsersQueryRepository,
  CreateUserUseCase,
  VeryBigCalculateQuery,
  UserCreatedEventHandler,
  UserCreatedEventHandler2,
];

@Module({
  // Регистрация модулей
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // work with nest ConfigModule
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigurationType, true>) => {
        const environmentSettings = configService.get('environmentSettings', {
          infer: true,
        });
        const databaseSettings = configService.get('databaseSettings', {
          infer: true,
        });

        const uri = environmentSettings.isTesting
          ? databaseSettings.MONGO_CONNECTION_URI_FOR_TESTS
          : databaseSettings.MONGO_CONNECTION_URI;
        console.log(uri);

        return {
          uri: uri,
        };
      },
      inject: [ConfigService],
    }),

    /*      // custom appSettings
              MongooseModule.forRoot(appSettings.env.isTesting()
                  ? appSettings.api.MONGO_CONNECTION_URI_FOR_TESTS
                  : appSettings.api.MONGO_CONNECTION_URI),*/
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // Регистрация провайдеров
  providers: [
    ...usersProviders,
    NameIsExistConstraint,
    /* {
                provide: UsersService,
                useClass: UsersService,
            },*/
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
