import {Injectable, Scope} from '@nestjs/common';
import {randomUUID} from "crypto";

@Injectable({scope: Scope.DEFAULT})
export class TraceService {

    private readonly traceId: string

    constructor() {
        this.traceId = randomUUID();
        console.log("TraceService creating")
    }

    getTraceId(): string {
        return this.traceId;
    }
}
