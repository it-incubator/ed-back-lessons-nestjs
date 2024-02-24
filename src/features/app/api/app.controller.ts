import {ApiTags} from '@nestjs/swagger';
import {Controller, Get, Scope,} from '@nestjs/common';
import {AppService} from '../application/app.service';
import {TraceService} from "../application/trace.service";
import {App2Service} from "../application/app2.service";
import { LoggerService } from '../application/logger.service';

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
        //private logger: LoggerService,
    ) {
        //this.logger.setContext(AppController.name);
        console.log('AppController creating')
    }

    @Get()
    async request() {
        //this.logger.log('request in controller');
        //console.log(this.traceService.getTraceId())
        const count = await this.appService.getCountAndIncrement();
        //await this.app2Service.getCountAndIncrement();
        return {
            num: count
        }
    }
}
