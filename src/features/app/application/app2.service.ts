import {Injectable, Scope} from '@nestjs/common';
import {AppRepository} from '../infrastructure/app.repository';
import {TraceService} from "./traise.service";
import {AppService} from "./app.service";

@Injectable({scope: Scope.DEFAULT})
export class App2Service {
    constructor(
        private appRepository: AppRepository,
        private traceService: TraceService,

    ) {
        console.log("App2Service creating")
    }

    async getCountAndIncrement() {
        //console.log(this.traceService.getTraceId())

        this.appRepository.increment();
        return this.appRepository.getCount();
    }
}