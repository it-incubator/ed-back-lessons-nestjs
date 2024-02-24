import {Injectable, Scope} from '@nestjs/common';
import {AppRepository} from '../infrastructure/app.repository';
import {TraceService} from "./trace.service";
import { LoggerService } from './logger.service';

@Injectable({scope: Scope.DEFAULT})
export class App2Service {
    constructor(
        private appRepository: AppRepository,
        private traceService: TraceService,
        //private logger: LoggerService,
    ) {
        //this.logger.setContext(App2Service.name);
        console.log("App2Service creating")
    }

    async getCountAndIncrement() {
        //this.logger.log('request in App2Service');
        //console.log(this.traceService.getTraceId())

        this.appRepository.increment();
        return this.appRepository.getCount();
    }
}