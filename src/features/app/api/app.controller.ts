import {ApiTags} from '@nestjs/swagger';
import {Controller, Get, Scope,} from '@nestjs/common';
import {AppService} from '../application/app.service';
import {TraceService} from "../application/traise.service";
import {App2Service} from "../application/app2.service";

// DEFAULT => REQUEST
// DEFAULT => TRANSIENT
// REQUEST => TRANSIENT
@ApiTags('Counter')
@Controller({path: 'counters', scope: Scope.DEFAULT})
export class AppController {
    constructor(
        private traceService: TraceService,
        private appService: AppService,
        private app2Service: App2Service,
    ) {
        console.log('AppController creating')
    }

    @Get()
    async request() {
        //console.log(this.traceService.getTraceId())
        const count = await this.appService.getCountAndIncrement();
        return {
            num: count
        }
    }
}
