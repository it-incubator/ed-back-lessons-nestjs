import {Injectable} from '@nestjs/common';

@Injectable()
export class TestingService {

    async deleteAllData() {
        return true;
    }

}
