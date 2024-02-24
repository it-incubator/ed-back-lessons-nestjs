import {Module} from '@nestjs/common';
import {AppRepository} from "./features/app/infrastructure/app.repository";
import {AppService} from "./features/app/application/app.service";
import {TraceService} from "./features/app/application/trace.service";
import {AppController} from "./features/app/api/app.controller";
import {App2Service} from "./features/app/application/app2.service";
import configuration from './settings/configuration';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './features/app/application/logger.service';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
    }),],
    controllers: [AppController],
    providers: [
        AppRepository,
        AppService,
        App2Service,
        TraceService,
        //LoggerService,
    ]
})
export class AppModule {
}
