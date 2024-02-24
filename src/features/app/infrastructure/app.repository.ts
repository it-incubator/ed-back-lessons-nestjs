import {Injectable, Scope} from '@nestjs/common';

@Injectable({
    scope: Scope.DEFAULT
})
export class AppRepository {
    count = 0;

    constructor() {
        console.log('AppRepository creating')
    }

    increment() {
        this.count++;
    }

    getCount() {
        return this.count;
    }
}
