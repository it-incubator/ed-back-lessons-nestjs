import {DynamicModule, Module} from '@nestjs/common';
import {TestingController} from "./api/testing.controller";
import {TestingService} from "./application/testing.service";
import {config} from 'dotenv'

config()

@Module({})
export class TestingModule {

    static register(): DynamicModule {
        if (process.env.ENV !== 'PRODUCTION') {
            return {
                module: TestingModule,
                controllers: [TestingController],
                providers: [TestingService],
            };
        } else {
            return {
                module: TestingModule,
                // Пустой массив providers и controllers, чтобы отключить модуль
                providers: [],
                controllers: [],
            };
        }
    }
}
