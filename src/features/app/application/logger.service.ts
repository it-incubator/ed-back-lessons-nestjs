import {Injectable, Scope} from '@nestjs/common';

@Injectable({scope: Scope.TRANSIENT})
export class LoggerService {

    private context: string

    setContext(context: string): string {
        return this.context = context;
    }

    log(message: string) {
        console.log(`message: ${message} -> is service: ${this.context}`);
    }
}
