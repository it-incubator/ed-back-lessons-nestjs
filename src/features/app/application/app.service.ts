import {Injectable, Scope} from '@nestjs/common';
import {AppRepository} from '../infrastructure/app.repository';
import {TraceService} from "./traise.service";

@Injectable({scope: Scope.DEFAULT})
export class AppService {
    constructor(
        private appRepository: AppRepository,
        private traceService: TraceService,
    ) {
        console.log("AppService creating")
    }

    async getCountAndIncrement() {
        //console.log(this.traceService.getTraceId())

        this.appRepository.increment();
        return this.appRepository.getCount();
    }
}
