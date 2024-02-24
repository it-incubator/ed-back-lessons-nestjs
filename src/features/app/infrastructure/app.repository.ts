import {Injectable, Scope} from '@nestjs/common';
import { LoggerService } from '../application/logger.service';

@Injectable({
    scope: Scope.DEFAULT
})
export class AppRepository {
    count = 0;

    constructor(
      //private logger: LoggerService
    ) {
        //this.logger.setContext(AppRepository.name);
        console.log('AppRepository creating')
    }

    increment() {
        this.count++;
    }

    getCount() {
        //this.logger.log('message in getCount method');
        return this.count;
    }
}
