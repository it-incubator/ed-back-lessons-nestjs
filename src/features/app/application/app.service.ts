import {Injectable, Scope} from '@nestjs/common';
import {AppRepository} from '../infrastructure/app.repository';
import {TraceService} from "./trace.service";
import { LoggerService } from './logger.service';

@Injectable({scope: Scope.DEFAULT})
export class AppService {
    constructor(
        private appRepository: AppRepository,
        private traceService: TraceService,
        //private logger: LoggerService,
    ) {
        //this.logger.setContext(AppService.name);
        console.log("AppService creating")
    }

    async getCountAndIncrement() {
        //this.logger.log('request in AppService');
        //console.log(this.traceService.getTraceId())

        this.appRepository.increment();
        return this.appRepository.getCount();
    }
}
